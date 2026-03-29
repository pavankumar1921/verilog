import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import type { Marker } from "./types";

interface Props {
  signals: string[];
  vcdData: any;
  scale: number;
  setScale: (v: any) => void;
  offsetX: number;
  setOffsetX: (v: any) => void;
  onCursorMove: (time: number, x: number) => void;
  markers: Marker[];
  showGrid: boolean;
  signalColors: Record<string, string>;
  selectedSignal: string | null;
}

const SIGNAL_HEIGHT = 50;
const PADDING_LEFT = 20;
const WAVE_HIGH_OFFSET = 10;
const WAVE_LOW_OFFSET = 40;

function hexToPixi(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

export default function WaveformCanvas({
  signals, vcdData, scale, setScale, offsetX, setOffsetX,
  onCursorMove, markers, showGrid, signalColors, selectedSignal,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixiApp = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current) return;

      const cw = containerRef.current.clientWidth || 800;
      const ch = Math.max(signals.length * SIGNAL_HEIGHT + 40, 400);

      const app = new PIXI.Application();
      await app.init({
        width: cw,
        height: ch,
        background: "#0b1120",
        antialias: true,
      });

      if (!mounted || !containerRef.current) return;

      pixiApp.current = app;
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(app.canvas);

      // Layers
      const gridLayer = new PIXI.Container();
      const waveLayer = new PIXI.Container();
      const markerLayer = new PIXI.Container();
      const labelLayer = new PIXI.Container();
      const cursorLayer = new PIXI.Container();

      app.stage.addChild(gridLayer);
      app.stage.addChild(waveLayer);
      app.stage.addChild(labelLayer);
      app.stage.addChild(markerLayer);
      app.stage.addChild(cursorLayer);

      // Compute scale
      const maxTime = Math.max(
        ...((vcdData?.changes || []).map((c: any) => c[0])),
        1
      );
      const effectiveScale = scale === 0 ? cw / maxTime : scale;

      const timeToX = (time: number) =>
        time * effectiveScale - offsetX + PADDING_LEFT;

      const getY = (value: string, yHigh: number, yLow: number, mid: number) => {
        if (value === "1") return yHigh;
        if (value === "0") return yLow;
        return mid;
      };

      // ─── GRID ───
      if (showGrid) {
        const g = new PIXI.Graphics();
        const minSpacing = 60;
        const rawInt = minSpacing / effectiveScale;
        const niceInts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
        const gridInterval = niceInts.find((n) => n >= rawInt) || 1000;

        for (let t = 0; t <= maxTime + gridInterval; t += gridInterval) {
          const x = timeToX(t);
          if (x >= 0 && x <= cw) {
            g.moveTo(x, 0);
            g.lineTo(x, ch);
          }
        }
        g.stroke({ width: 1, color: 0x1a2744, alpha: 0.6 });

        // Horizontal separators between signals
        for (let i = 0; i <= signals.length; i++) {
          const y = i * SIGNAL_HEIGHT;
          g.moveTo(0, y);
          g.lineTo(cw, y);
        }
        g.stroke({ width: 1, color: 0x1e3050, alpha: 0.4 });

        gridLayer.addChild(g);
      }

      // ─── BUILD SIGNAL DATA MAPS ───
      const symbolChanges: Record<string, any[]> = {};
      (vcdData?.changes || []).forEach((c: any) => {
        const [time, symbol, value] = c;
        if (!symbolChanges[symbol]) symbolChanges[symbol] = [];
        symbolChanges[symbol].push({ time, value });
      });

      const symbolMap: Record<string, { symbol: string; size?: number }> = {};
      (vcdData?.signal || []).forEach((s: any) => {
        symbolMap[s.name] = { symbol: s.symbol, size: s.size };
      });

      // ─── DRAW WAVEFORMS ───
      signals.forEach((sig, index) => {
        const sigInfo = symbolMap[sig];
        if (!sigInfo) return;

        const color = signalColors[sig] || "#3b82f6";
        const pixiColor = hexToPixi(color);
        const isBus = sigInfo.size && sigInfo.size > 1;
        const isSelected = selectedSignal === sig;

        const yBase = index * SIGNAL_HEIGHT;
        const yHigh = yBase + WAVE_HIGH_OFFSET;
        const yLow = yBase + WAVE_LOW_OFFSET;
        const mid = (yHigh + yLow) / 2;

        const changes = symbolChanges[sigInfo.symbol] || [];
        const g = new PIXI.Graphics();

        // Selection highlight
        if (isSelected) {
          const highlight = new PIXI.Graphics();
          highlight.rect(0, yBase, cw, SIGNAL_HEIGHT);
          highlight.fill({ color: 0xffffff, alpha: 0.05 });
          waveLayer.addChild(highlight);
        }

        // Signal name label (left side overlay)
        const nameText = new PIXI.Text({
          text: sig,
          style: {
            fill: color,
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: isSelected ? "bold" : "normal",
          },
        });
        nameText.x = 4;
        nameText.y = yBase + 2;
        nameText.alpha = 0.7;
        labelLayer.addChild(nameText);

        let prevTime = 0;
        let prevValue = "0";

        if (isBus) {
          // ─── BUS WAVEFORM (diamond/hex style) ───
          changes.forEach((change: any, ci: number) => {
            const x1 = timeToX(prevTime);
            const x2 = timeToX(change.time);
            const nextX = ci < changes.length - 1
              ? timeToX(changes[ci + 1].time)
              : timeToX(maxTime);

            // Draw bus transition (X shape at transition)
            if (ci > 0) {
              const transW = Math.min(6, (x2 - x1) * 0.2);
              g.moveTo(x2 - transW, yHigh);
              g.lineTo(x2, mid);
              g.lineTo(x2 - transW, yLow);
              g.moveTo(x2 + transW, yHigh);
              g.lineTo(x2, mid);
              g.lineTo(x2 + transW, yLow);
            }

            // Top and bottom lines of bus
            const startX = ci === 0 ? x1 : x2 + 4;
            const endX = ci < changes.length - 1 ? timeToX(changes[ci + 1].time) - 4 : timeToX(maxTime);

            g.moveTo(startX, yHigh);
            g.lineTo(endX, yHigh);
            g.moveTo(startX, yLow);
            g.lineTo(endX, yLow);

            // Hex label inside bus
            const val = change.value;
            let hexStr: string;
            if (val.startsWith("b")) {
              hexStr = "0x" + parseInt(val.slice(1), 2).toString(16).toUpperCase();
            } else {
              hexStr = "0x" + val;
            }

            const regionWidth = endX - startX;
            if (regionWidth > 25) {
              const txt = new PIXI.Text({
                text: hexStr,
                style: {
                  fill: color,
                  fontSize: 10,
                  fontFamily: "monospace",
                },
              });
              txt.x = startX + (regionWidth - txt.width) / 2;
              txt.y = mid - 6;
              labelLayer.addChild(txt);
            }

            prevTime = change.time;
            prevValue = change.value;
          });
        } else {
          // ─── SINGLE-BIT WAVEFORM ───
          changes.forEach((change: any) => {
            const x1 = timeToX(prevTime);
            const x2 = timeToX(change.time);
            const yPrev = getY(prevValue, yHigh, yLow, mid);

            // Horizontal line
            g.moveTo(x1, yPrev);
            g.lineTo(x2, yPrev);

            // Vertical transition
            const yNew = getY(change.value, yHigh, yLow, mid);
            g.lineTo(x2, yNew);

            prevTime = change.time;
            prevValue = change.value;
          });

          // Extend to end
          const endX = timeToX(maxTime);
          const yPrev = getY(prevValue, yHigh, yLow, mid);
          g.lineTo(endX, yPrev);
        }

        g.stroke({ width: isSelected ? 2.5 : 1.8, color: pixiColor });
        waveLayer.addChild(g);
      });

      // ─── MARKERS ───
      markers.forEach((marker) => {
        const mx = timeToX(marker.time);
        const mg = new PIXI.Graphics();

        // Dashed effect via segments
        for (let y = 0; y < ch; y += 8) {
          mg.moveTo(mx, y);
          mg.lineTo(mx, Math.min(y + 5, ch));
        }
        mg.stroke({ width: 2, color: hexToPixi(marker.color) });

        // Marker label
        const mLabel = new PIXI.Text({
          text: `${marker.time}ns`,
          style: {
            fill: marker.color,
            fontSize: 9,
            fontFamily: "monospace",
          },
        });
        mLabel.x = mx + 3;
        mLabel.y = 2;
        markerLayer.addChild(mg);
        markerLayer.addChild(mLabel);
      });

      // ─── CURSOR ───
      app.stage.eventMode = "static";
      app.stage.hitArea = new PIXI.Rectangle(0, 0, cw, ch);

      app.stage.on("pointermove", (e: any) => {
        const x = e.global.x;
        const time = Math.max(0, Math.round((x - PADDING_LEFT + offsetX) / effectiveScale));
        onCursorMove(time, x);

        cursorLayer.removeChildren();
        const line = new PIXI.Graphics();
        line.moveTo(x, 0);
        line.lineTo(x, ch);
        line.stroke({ width: 1, color: 0xff4444, alpha: 0.8 });
        cursorLayer.addChild(line);
      });

      // ─── PAN ───
      let dragging = false;
      let lastX = 0;

      app.stage.on("pointerdown", (e: any) => {
        dragging = true;
        lastX = e.global.x;
      });
      app.stage.on("pointerup", () => (dragging = false));
      app.stage.on("pointerupoutside", () => (dragging = false));
      app.stage.on("pointermove", (e: any) => {
        if (!dragging) return;
        const dx = e.global.x - lastX;
        setOffsetX((prev: number) => Math.max(0, prev - dx));
        lastX = e.global.x;
      });

      // ─── ZOOM (wheel) ───
      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.9 : 1.1;
        setScale((prev: number) => {
          const base = prev === 0 ? effectiveScale : prev;
          return Math.max(0.01, base * factor);
        });
      };

      containerRef.current?.addEventListener("wheel", wheelHandler, { passive: false });
    };

    init();

    return () => {
      mounted = false;
      if (pixiApp.current) {
        pixiApp.current.destroy(true);
        pixiApp.current = null;
      }
    };
  }, [signals, vcdData, scale, offsetX, markers, showGrid, signalColors, selectedSignal]);

  return (
    <div ref={containerRef} className="wv-canvas" />
  );
}
