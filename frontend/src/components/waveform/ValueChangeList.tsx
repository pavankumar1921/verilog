// ValueChangeList.tsx
import { useState, useMemo } from "react";
import type { ValueChange } from "./types";

interface Props {
  changes: ValueChange[];
  cursorTime: number;
  signalColors: Record<string, string>;
}

export default function ValueChangeList({ changes, cursorTime, signalColors }: Props) {
  const [filterSignal, setFilterSignal] = useState("All sigs");
  const [filterEdge, setFilterEdge] = useState("All edg");

  const filtered = useMemo(() => {
    let result = changes;
    if (filterSignal !== "All sigs") {
      result = result.filter((c) => c.signal === filterSignal);
    }
    return result;
  }, [changes, filterSignal, filterEdge]);

  const uniqueSignals = useMemo(
    () => [...new Set(changes.map((c) => c.signal))],
    [changes]
  );

  return (
    <div className="wv-vcl">
      {/* Header */}
      <div className="wv-vcl-header">
        <span className="wv-vcl-title">VALUE CHANGE LIST</span>
        <span className="wv-vcl-count">{changes.length} events</span>
      </div>

      {/* Filters */}
      <div className="wv-vcl-filters">
        <input
          className="wv-vcl-filter-input"
          placeholder="Filter signal"
          type="text"
        />
        <select
          className="wv-vcl-select"
          value={filterSignal}
          onChange={(e) => setFilterSignal(e.target.value)}
        >
          <option>All sigs</option>
          {uniqueSignals.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="wv-vcl-select"
          value={filterEdge}
          onChange={(e) => setFilterEdge(e.target.value)}
        >
          <option>All edg</option>
          <option>↑</option>
          <option>↓</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="wv-vcl-actions">
        <button className="wv-vcl-btn" title="Jump to cursor">Jump</button>
        <button className="wv-vcl-btn" title="Previous">◀◀</button>
        <button className="wv-vcl-btn" title="Next">▶▶</button>
        <button className="wv-vcl-btn" title="Export CSV">↓ CSV</button>
      </div>

      {/* Table header */}
      <div className="wv-vcl-table-header">
        <span className="wv-vcl-col-time">Time ▲</span>
        <span className="wv-vcl-col-sig">Signal</span>
        <span className="wv-vcl-col-edge">Edge</span>
        <span className="wv-vcl-col-from">From</span>
        <span className="wv-vcl-col-to">To</span>
        <span className="wv-vcl-col-dur">Duration</span>
      </div>

      {/* Rows */}
      <div className="wv-vcl-rows">
        {filtered.map((c, i) => {
          const color = signalColors[c.signal] || "#94a3b8";
          const isNearCursor = Math.abs(c.time - cursorTime) < 5;

          return (
            <div
              key={i}
              className={`wv-vcl-row ${isNearCursor ? "wv-vcl-row-highlight" : ""}`}
            >
              <span className="wv-vcl-col-time" style={{ color: "#22d3ee" }}>
                {c.time} ns
              </span>
              <span className="wv-vcl-col-sig" style={{ color }}>
                {c.signal}
              </span>
              <span className="wv-vcl-col-edge">
                <span className={`wv-vcl-edge ${c.edge === "↑" ? "wv-edge-up" : c.edge === "↓" ? "wv-edge-down" : ""}`}>
                  {c.edge}
                </span>
              </span>
              <span className="wv-vcl-col-from">{c.from}</span>
              <span className="wv-vcl-col-to">{c.to}</span>
              <span className="wv-vcl-col-dur">
                {c.duration > 0 ? `${c.duration} ns` : "-"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}