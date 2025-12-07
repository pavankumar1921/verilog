import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { Typography, Stack, Button } from "@mui/material";

interface VCDSignal {
  name: string;
  symbol: string;
  type?: string;
  size?: number;
}
interface VCDChange {
  0: number; // time
  1: string; // symbol
  2: string; // value
}
export interface VCDData {
  signal: VCDSignal[];
  changes: VCDChange[];
  endtime?: string;
  scale?: string; // e.g. "1ns"
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const WaveformViewer: React.FC<{ vcdData: VCDData | null }> = ({ vcdData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // View state
  const [zoom, setZoom] = useState(1);        // 1 = fit width
  const [offset, setOffset] = useState(0);    // pan in pixels within plot area (not including margins)
  const [cursorX, setCursorX] = useState<number | null>(null); // canvas-space X for cursor (pixels)
  const [isPanning, setIsPanning] = useState(false);
  const panLastX = useRef<number | null>(null);

  // Cache processed data
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [waves, setWaves] = useState<Array<{ name: string; points: string }>>([]);

  // Responsive: match canvas width to container width (HiDPI aware)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const holder = containerRef.current;
    if (!canvas || !holder) return;
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = holder.clientWidth;      // CSS pixels
    canvas.style.width = cssWidth + "px";
    // Height is recomputed in draw(); keep a base here to avoid zero-height flashes
    canvas.style.height = "400px";
    canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
    canvas.height = Math.max(1, Math.floor(400 * dpr));
  }, []);

  useLayoutEffect(() => {
    resizeCanvas();
    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resizeCanvas]);

  // Preprocess VCD → timestamps + 0/1/x wave strings per signal
  useEffect(() => {
    if (!vcdData) {
      setTimestamps([]);
      setWaves([]);
      return;
    }
    const sigDefs = vcdData.signal || [];
    const changes = vcdData.changes || [];

    const ts = [...new Set(changes.map((c) => c[0]))].sort((a, b) => a - b);
    const wavesLocal: Array<{ name: string; points: string }> = [];

    sigDefs.forEach((sig) => {
      const sigChanges = changes.filter((c) => c[1] === sig.symbol).sort((a,b) => a[0]-b[0]);
      let current = "0";
      const seq = ts.map((t) => {
        const found = sigChanges.find((c) => c[0] === t);
        if (found) current = found[2];
        // Normalize to single character for drawing
        if (current === "1" || current === "0") return current;
        return "x"; // x/z/others
      });
      wavesLocal.push({ name: sig.name, points: seq.join("") });
    });

    setTimestamps(ts);
    setWaves(wavesLocal);
    // Reset view on new data
    setZoom(1);
    setOffset(0);
    setCursorX(null);
  }, [vcdData]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Margins around plot area (scaled to DPR)
    const margin = {
      top: 20 * dpr,
      right: 20 * dpr,
      bottom: 40 * dpr,
      left: 120 * dpr,
    };

    // Current canvas pixel size
    const CW = canvas.width;
    // Base plot width/height (visible viewport inside margins)
    const plotW = Math.max(10 * dpr, CW - margin.left - margin.right);

    const signalHeight = 40 * dpr;
    const signalSpacing = 10 * dpr;
    const rows = Math.max(1, waves.length);
    const desiredHeight =
      rows * (signalHeight + signalSpacing) + margin.top + margin.bottom;

    if (canvas.height !== desiredHeight) {
      canvas.height = Math.ceil(desiredHeight);
    }

    // Background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // No data?
    if (!timestamps.length || !waves.length) {
      ctx.fillStyle = "#f55";
      ctx.font = `${14 * dpr}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("No waveform data available", canvas.width / 2, canvas.height / 2);
      return;
    }

    // Compute full content width (after zoom) and clamp offset
    const contentW = plotW * zoom;
    const maxOffset = Math.max(0, contentW - plotW);
    const safeOffset = clamp(offset, 0, maxOffset);
    if (safeOffset !== offset) {
      // keep state consistent without loop: defer to next frame
      setOffset(safeOffset);
    }

    // Helper to map timestamp index → on-canvas X (visible view)
    const N = timestamps.length;
    const indexToX = (i: number): number => {
      const xFull = margin.left + (i * contentW) / N; // full zoomed space
      return xFull - safeOffset;                      // shift by pan
    };

    // Grid lines & time scale
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1 * dpr;
    const gridEvery = Math.max(1, Math.floor(N / 10)); // ~10 grid cols
    for (let i = 0; i <= N; i += gridEvery) {
      const x = indexToX(i);
      if (x < margin.left || x > margin.left + plotW) continue;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, canvas.height - margin.bottom);
      ctx.stroke();

      // time label
      ctx.fillStyle = "#0f0";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.textAlign = "center";
      const time = timestamps[Math.min(i, N - 1)];
      ctx.fillText(`${time}ns`, x, canvas.height - 8 * dpr);
    }

    // Draw each signal
    waves.forEach((sig, row) => {
      const yTop = margin.top + row * (signalHeight + signalSpacing);
      const yHigh = yTop + 6 * dpr;
      const yLow = yTop + signalHeight - 6 * dpr;
      const mid = (yHigh + yLow) / 2;

      // Name
      ctx.fillStyle = "#0f0";
      ctx.font = `${14 * dpr}px monospace`;
      ctx.textAlign = "right";
      ctx.fillText(sig.name, margin.left - 10 * dpr, yTop + signalHeight / 2);

      // Wave
      ctx.strokeStyle = "#0f0";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      const pts = sig.points; // string of '0','1','x'
      for (let i = 0; i < N; i++) {
        const x = indexToX(i);
        const nextX = indexToX(i + 1);
        if (nextX < margin.left || x > margin.left + plotW) continue; // outside view

        const val = pts[i];
        const yVal = val === "1" ? yHigh : val === "0" ? yLow : mid;

        if (i === 0 || indexToX(i - 1) < margin.left) {
          ctx.moveTo(x, yVal);
        } else {
          const prevVal = pts[i - 1];
          const yPrev = prevVal === "1" ? yHigh : prevVal === "0" ? yLow : mid;
          if (yPrev !== yVal) {
            // vertical edge for transition
            ctx.lineTo(x, yPrev);
            ctx.lineTo(x, yVal);
          }
        }
        ctx.lineTo(nextX, yVal);
      }
      ctx.stroke();

      // Values (optional small labels at centers)
      ctx.fillStyle = "#bbb";
      ctx.font = `${9 * dpr}px monospace`;
      ctx.textAlign = "center";
      const step = Math.max(1, Math.floor(N / 50)); // don't spam too many labels
      for (let i = 0; i < N; i += step) {
        const centerX = (indexToX(i) + indexToX(i + 1)) / 2;
        if (centerX < margin.left || centerX > margin.left + plotW) continue;
        ctx.fillText(pts[i], centerX, yTop + signalHeight / 2 + 14 * dpr);
      }
    });

    // Cursor (vertical line + time readout)
    if (cursorX !== null) {
      const x = cursorX * dpr; // cursorX stored in CSS px; convert to device px
      // Only draw if inside plot area
      if (x >= margin.left && x <= margin.left + plotW) {
        ctx.strokeStyle = "#6cf";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, canvas.height - margin.bottom);
        ctx.stroke();

        // Compute time index under cursor
        const rel = x - margin.left + safeOffset; // pixel in content space
        const frac = clamp(rel / contentW, 0, 0.999999);
        const idx = Math.floor(frac * N);
        const time = timestamps[idx];

        // Cursor label
        const label = `${time} ns`;
        const pad = 4 * dpr;
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        const textW = ctx.measureText(label).width;
        const boxX = clamp(x - textW / 2 - pad, margin.left, margin.left + plotW - textW - pad * 2);
        const boxY = Math.max(6 * dpr, margin.top - 18 * dpr);
        ctx.fillRect(boxX, boxY, textW + pad * 2, 16 * dpr);
        ctx.fillStyle = "#6cf";
        ctx.font = `${11 * dpr}px monospace`;
        ctx.textAlign = "left";
        ctx.fillText(label, boxX + pad, boxY + 12 * dpr);
      }
    }
  }, [timestamps, waves, zoom, offset, cursorX]);

  // --- Interaction handlers ---
  const handleZoom = (factor: number, centerCssX?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    const marginLeft = 120 * dpr;
    const marginRight = 20 * dpr;
    const plotW = canvas.width - marginLeft - marginRight;
    if (plotW <= 0) return;

    const contentW = plotW * zoom;

    // Center X (in CSS px) → clamp to plot area; default center if missing
    const centerCss = typeof centerCssX === "number"
      ? centerCssX
      : ( (canvas.getBoundingClientRect().left + (marginLeft/dpr)) + (plotW/dpr)/2 );

    const centerCanvasPx = (centerCss - canvas.getBoundingClientRect().left) * dpr; // device px
    const viewX = clamp(centerCanvasPx - marginLeft, 0, plotW); // px within plot viewport

    // World coordinate (content space) under the cursor BEFORE zoom
    const worldX = offset + viewX;

    const newZoom = clamp(zoom * factor, 1, 32); // clamp zoom range
    const newContentW = plotW * newZoom;

    // Keep the same world point under the cursor after zoom
    let newOffset = worldX - viewX;
    // Clamp to bounds
    newOffset = clamp(newOffset, 0, Math.max(0, newContentW - plotW));

    setZoom(newZoom);
    setOffset(newOffset);
  };

  const onWheel: React.WheelEventHandler<HTMLCanvasElement> = (e) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return; // use ctrl/⌘/shift + wheel to zoom
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1/1.15;
    handleZoom(factor, e.clientX);
  };

  const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    setIsPanning(true);
    panLastX.current = e.clientX;
  };
  const onMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    setIsPanning(false);
    panLastX.current = null;
  };
  const onMouseLeave: React.MouseEventHandler<HTMLCanvasElement> = () => {
    setIsPanning(false);
    panLastX.current = null;
    setCursorX(null);
  };
  const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (isPanning && panLastX.current !== null) {
      const dxCss = e.clientX - panLastX.current;         // CSS px
      const dpr = window.devicePixelRatio || 1;
      const dx = dxCss * dpr;                              // device px
      const marginLeft = 120 * dpr;
      const marginRight = 20 * dpr;
      const plotW = canvas.width - marginLeft - marginRight;
      const contentW = plotW * zoom;
      const maxOffset = Math.max(0, contentW - plotW);
      setOffset((o) => clamp(o - dx, 0, maxOffset));       // drag left→show right
      panLastX.current = e.clientX;
    } else {
      // Track cursor for crosshair (store in CSS px; draw converts to device px)
      setCursorX(e.clientX - rect.left);
    }
  };

  const onDoubleClick: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    // Quick zoom-in on double click at pointer
    handleZoom(1.5, e.clientX);
  };

  const zoomIn = () => handleZoom(1.25, cursorX !== null ? (canvasRef.current!.getBoundingClientRect().left + cursorX) : undefined);
  const zoomOut = () => handleZoom(1/1.25, cursorX !== null ? (canvasRef.current!.getBoundingClientRect().left + cursorX) : undefined);
  const resetView = () => { setZoom(1); setOffset(0); };

  return !vcdData ? (
    <Typography variant="body2" color="error">
      No waveform data available.
    </Typography>
  ) : (
    <div ref={containerRef} className="w-full">
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: "#0f0", mr: 1 }}>
          Waveform Viewer
        </Typography>
        <Button variant="outlined" size="small" onClick={zoomOut}>−</Button>
        <Button variant="outlined" size="small" onClick={zoomIn}>＋</Button>
        <Button variant="text" size="small" onClick={resetView}>Reset</Button>
        <Typography variant="caption" sx={{ ml: 1, color: "#aaa" }}>
          zoom {zoom.toFixed(2)}×
        </Typography>
        <Typography variant="caption" sx={{ ml: 1, color: "#aaa" }}>
          {vcdData.scale || "1ns"}
        </Typography>
      </Stack>

      <div className="overflow-x-hidden">
        <canvas
          ref={canvasRef}
          // width/height are set in JS for HiDPI; style controls CSS size
          style={{
            width: "100%",
            display: "block",
            border: "1px solid #0f0",
            backgroundColor: "#1a1a1a",
            cursor: isPanning ? "grabbing" : "crosshair",
            userSelect: "none",
          }}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onDoubleClick={onDoubleClick}
        />
      </div>

      <Typography variant="caption" sx={{ color: "#888" }}>
        Tip: Hold <b>Ctrl/⌘/Shift + Mouse Wheel</b> to zoom at pointer. Drag to pan.
      </Typography>
    </div>
  );
};

export default WaveformViewer;
