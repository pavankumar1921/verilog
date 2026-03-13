import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

type Props = {
  signals: string[];
  vcdData: any;
};

export default function WaveformCanvas({ signals, vcdData }: Props) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixiApp = useRef<PIXI.Application | null>(null);

  useEffect(() => {

    console.log("signals:", signals);
    console.log("vcdData:", vcdData);

    let mounted = true;

    const init = async () => {

      if (!containerRef.current) return;

      const app = new PIXI.Application();

      await app.init({
        width: containerRef.current.clientWidth || 800,
        height: 500,
        background: "#0f172a",
        antialias: true,
      });

      if (!mounted || !containerRef.current) return;

      pixiApp.current = app;

      containerRef.current.appendChild(app.canvas);

      /* zoom support */

      app.stage.eventMode = "static";

      app.stage.on("wheel", (e: any) => {

        const zoom = e.deltaY > 0 ? 0.9 : 1.1;

        app.stage.scale.x *= zoom;

      });

      /* ------------------------------
         Build symbol → changes map
      ------------------------------ */

      const symbolChanges: Record<string, any[]> = {};

      (vcdData?.changes || []).forEach((c: any) => {

        const time = c[0];
        const symbol = c[1];
        const value = c[2];

        if (!symbolChanges[symbol]) {
          symbolChanges[symbol] = [];
        }

        symbolChanges[symbol].push({
          time,
          value
        });

      });

      /* ------------------------------
         Build name → symbol map
      ------------------------------ */

      const symbolMap: Record<string, string> = {};

      (vcdData?.signal || []).forEach((s: any) => {
        symbolMap[s.name] = s.symbol;
      });

      /* ------------------------------
         Render waveforms
      ------------------------------ */

      signals.forEach((sig, index) => {

        const g = new PIXI.Graphics();

        const yLow = index * 40 + 30;
        const yHigh = index * 40 + 10;

        const symbol = symbolMap[sig];

        const signalChanges = symbol
          ? symbolChanges[symbol] || []
          : [];

        let prevX = 0;
        let prevY = yLow;

        g.moveTo(prevX, prevY);

        signalChanges.forEach((change: any) => {

          const x = change.time * 10;

          const valueY =
            change.value === "1"
              ? yHigh
              : yLow;

          g.lineTo(x, prevY);
          g.lineTo(x, valueY);

          prevX = x;
          prevY = valueY;

        });

        g.stroke({
          width: 2,
          color: 0x00ff88
        });

        app.stage.addChild(g);

      });

    };

    init();

    return () => {

      mounted = false;

      if (pixiApp.current) {
        pixiApp.current.destroy(true);
        pixiApp.current = null;
      }

    };

  }, [signals, vcdData]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
}