import { useMemo } from "react";

interface Props {
  scale: number;
  offsetX: number;
  maxTime: number;
}

export default function Timeline({ scale, offsetX, maxTime }: Props) {
  const ticks = useMemo(() => {
    const effectiveScale = scale === 0 ? 800 / maxTime : scale;
    const result: { x: number; label: string; isMajor: boolean }[] = [];

    // Determine good tick interval based on scale
    const pixelsPerNs = effectiveScale;
    const minTickSpacing = 60;
    const rawInterval = minTickSpacing / pixelsPerNs;

    // Round to nice numbers
    const niceIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
    let interval = niceIntervals.find((n) => n >= rawInterval) || 1000;
    const minorInterval = interval / 5;

    for (let t = 0; t <= maxTime + interval; t += minorInterval) {
      const x = t * effectiveScale - offsetX;
      const isMajor = Math.abs(t % interval) < 0.001 || t === 0;

      if (x >= -50 && x <= 2000) {
        result.push({
          x,
          label: isMajor ? `${t}ns` : "",
          isMajor,
        });
      }
    }

    return result;
  }, [scale, offsetX, maxTime]);

  return (
    <div className="wv-timeline">
      {/* Green top bar like SimView */}
      <div className="wv-timeline-bar" />

      {/* Tick marks and labels */}
      <div className="wv-timeline-ticks">
        {ticks.map((tick, i) => (
          <div
            key={i}
            className={`wv-timeline-tick ${tick.isMajor ? "wv-tick-major" : "wv-tick-minor"}`}
            style={{ left: tick.x }}
          >
            <div className="wv-tick-line" />
            {tick.label && <span className="wv-tick-label">{tick.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
