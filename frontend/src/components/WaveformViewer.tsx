import React, { useRef, useEffect } from "react";
import { Typography } from "@mui/material";

interface VCDSignal {
  name: string;
  symbol: string;
  type?: string;
  size?: number;
}
interface VCDChange {
  0: number;
  1: string;
  2: string;
}
export interface VCDData {
  signal: VCDSignal[];
  changes: VCDChange[];
  endtime?: string;
  scale?: string;
}

const WaveformViewer: React.FC<{ vcdData: VCDData | null }> = ({ vcdData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!vcdData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const signals: Array<{ name: string; wave: string }> = [];
    try {
      const signalDefs = vcdData.signal || [];
      const changes = vcdData.changes || [];
      const timestamps = [...new Set(changes.map((c) => c[0]))].sort((a, b) => a - b);

      signalDefs.forEach((sig) => {
        const signalChanges = changes.filter((c) => c[1] === sig.symbol);
        let currentValue = "0";
        const waveData = timestamps.map((time) => {
          const change = signalChanges.find((c) => c[0] === time);
          if (change) currentValue = change[2];
          return currentValue;
        });
        signals.push({ name: sig.name, wave: waveData.join("") });
      });

      const margin = { top: 20, right: 20, bottom: 40, left: 100 };
      const width = canvas.width - margin.left - margin.right;
      const signalHeight = 40;
      const signalSpacing = 10;
      canvas.height = signals.length * (signalHeight + signalSpacing) + margin.top + margin.bottom;

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#333";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= timestamps.length; i++) {
        const x = margin.left + (i * width) / timestamps.length;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, canvas.height - margin.bottom);
        ctx.stroke();
      }

      signals.forEach((signal, idx) => {
        const y = margin.top + idx * (signalHeight + signalSpacing);

        ctx.fillStyle = "#0f0";
        ctx.font = "14px monospace";
        ctx.textAlign = "right";
        ctx.fillText(signal.name, margin.left - 10, y + signalHeight / 2);

        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 2;
        ctx.beginPath();

        const wavePoints = signal.wave.split("");
        wavePoints.forEach((value, i) => {
          const x = margin.left + (i * width) / wavePoints.length;
          const nextX = margin.left + ((i + 1) * width) / wavePoints.length;
          const yHigh = y + 5;
          const yLow = y + signalHeight - 5;
          const yVal = value === "1" ? yHigh : yLow;

          if (i === 0) ctx.moveTo(x, yVal);
          else {
            const prevVal = wavePoints[i - 1];
            if (prevVal !== value) {
              ctx.lineTo(x, prevVal === "1" ? yHigh : yLow);
              ctx.lineTo(x, yVal);
            } else ctx.lineTo(x, yVal);
          }

          if (i === wavePoints.length - 1) ctx.lineTo(nextX, yVal);
        });

        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        wavePoints.forEach((value, i) => {
          const x = margin.left + (i + 0.5) * width / wavePoints.length;
          const yText = y + signalHeight / 2 + 15;
          ctx.fillText(value, x, yText);
        });
      });

      ctx.fillStyle = "#0f0";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      timestamps.forEach((time, i) => {
        const x = margin.left + (i * width) / timestamps.length;
        ctx.fillText(`${time}ns`, x, canvas.height - 5);
      });
    } catch (err: any) {
      ctx.fillStyle = "#f00";
      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Error rendering waveform", canvas.width / 2, canvas.height / 2);
      ctx.font = "12px monospace";
      ctx.fillText(err.message, canvas.width / 2, canvas.height / 2 + 20);
    }
  }, [vcdData]);

  return !vcdData ? (
    <Typography variant="body2" color="error">
      No waveform data available.
    </Typography>
  ) : (
    <div className="overflow-x-auto">
      <Typography variant="h6" sx={{ color: "#0f0", mb: 1 }}>
        Waveform Viewer
      </Typography>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{
          border: "1px solid #0f0",
          display: "block",
          backgroundColor: "#1a1a1a",
        }}
      />
    </div>
  );
};

export default WaveformViewer;
