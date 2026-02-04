
const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const vcdParser = require('vcd-parser');

const router = express.Router();

function parseVCD(vcdText) {
  const lines = vcdText.split(/\r?\n/);
  const signal = [];
  const symbolToName = {};
  const changes = [];
  let scale = "1ns";
  let time = 0;
  let endtime = 0;

  for (let line of lines) {
    line = line.trim();
    if (line === "" || line.startsWith("$comment")) continue;

    if (line.startsWith("$timescale")) {
      const match = line.match(/\$timescale\s+(.+?)\s+\$end/);
      if (match) scale = match[1];
      continue;
    }

    if (line.startsWith("$var")) {
      const match = line.match(/\$var\s+\w+\s+(\d+)\s+(\S+)\s+(\S+)/);
      if (match) {
        const [, , symbol, name] = match;
        symbolToName[symbol] = name;
        signal.push({ name, symbol });
      }
      continue;
    }

    if (line.startsWith("#")) {
      time = parseInt(line.slice(1));
      if (time > endtime) endtime = time;
      continue;
    }

    if (/^[01xz][!-~]/.test(line)) {
      const value = line[0];
      const symbol = line[1];
      if (symbolToName[symbol]) {
        changes.push([time, symbol, value]);
      }
      continue;
    }
  
    if (/^[br][^\s]+\s[!-~]/.test(line)) {
      const [, valAndSym] = line.split(/^([br][^\s]+\s[!-~])/);
      const parts = line.split(" ");
      const value = parts[0].substring(1); 
      const symbol = parts[1];
      if (symbolToName[symbol]) {
        changes.push([time, symbol, value]);
      }
    }
  }

  return {
    signal,
    changes,
    endtime: String(endtime),
    scale
  };
}


router.post("/simulate", async (req, res) => {
  try {
    const { designCode, testbenchCode } = req.body;

    const outDir = path.join(__dirname, '../simulations/temp');
    fs.mkdirSync(outDir, { recursive: true });

    const designPath = path.join(outDir, "design.v");
    const testPath = path.join(outDir, "testbench.v");
    const outBinary = path.join(outDir, "a.out");
    const schematicPrefix = path.join(outDir, "schematic");
    const dotFile = `${schematicPrefix}.dot`;
    const svgFile = `${schematicPrefix}.svg`;
    const vcdPath = path.join(outDir, "dump.vcd");

    fs.writeFileSync(designPath, designCode);
    fs.writeFileSync(testPath, testbenchCode);

    const execPromise = (command) => {
      return new Promise((resolve, reject) => {
        exec(command, { cwd: outDir }, (error, stdout, stderr) => {
          if (error) {
            reject({ error, stdout, stderr });
          } else {
            resolve({ stdout, stderr });
          }
        });
      });
    };

    const compile = `iverilog -o a.out design.v testbench.v`;
    console.log("🔧 Compiling:", compile);
   
    try {
      const compileResult = await execPromise(compile);
      console.log("✅ Compile output:", compileResult.stdout);
    } catch (err) {
      console.error("❌ Compile error:", err.stderr);
      return res.status(500).json({ error: "Compile error", details: err.stderr });
    }

    // Run simulation
    const run = `vvp a.out`;
    console.log("▶️ Running simulation:", run);
   
    let simulationOutput = "";
    try {
      const runResult = await execPromise(run);
      simulationOutput = runResult.stdout;
      console.log("✅ Simulation output:", simulationOutput);
    } catch (err) {
      console.error("❌ Simulation error:", err.stderr);
      return res.status(500).json({ error: "Simulation error", details: err.stderr });
    }

    // Generate schematic
    const yosys = `yosys -p "read_verilog design.v; proc; show -format dot -prefix schematic"`;
    console.log("📐 Running yosys:", yosys);
   
    try {
      const yosysResult = await execPromise(yosys);
      console.log("✅ Yosys output:", yosysResult.stdout);
    } catch (err) {
      console.error("❌ Yosys error:", err.stderr);
    }

    // Convert DOT to SVG
    const dot = `dot -Tsvg schematic.dot -o schematic.svg`;
    try {
      await execPromise(dot);
      console.log("✅ SVG generated");
    } catch (err) {
      console.error("❌ DOT error:", err.stderr);
    }

    // Parse VCD file
    let waveformData = null;
    if (fs.existsSync(vcdPath)) {
      try {
        const vcdText = fs.readFileSync(vcdPath, "utf8");
        console.log(vcdText,"vcdtext")
        console.log("📄 VCD file found, size:", vcdText.length, "bytes");
        waveformData = parseVCD(vcdText);
        console.log(JSON.stringify(waveformData, null, 2));
        console.log(waveformData,"wd")
        console.log("✅ VCD parsed successfully");
      } catch (parseError) {
        console.error("❌ Failed to parse VCD:", parseError);
      }
    } else {
      console.warn("⚠️ VCD file not found at:", vcdPath);
    }

    const svgExists = fs.existsSync(svgFile);


    const response = {
      success: true,
      message: "Simulation complete",
      output: simulationOutput,
      waveform: waveformData,
      svg: svgExists ? `/simulations/temp/schematic.svg` : null
    };

    console.log("📤 Sending response...");
    res.json(response);

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
});

module.exports = router;