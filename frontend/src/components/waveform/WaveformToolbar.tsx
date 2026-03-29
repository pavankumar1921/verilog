import type { Marker } from "./types";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitAll: () => void;
  onAddMarker: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  cursorTime: number;
  scale: number;
  markers: Marker[];
  onRemoveMarker: (id: number) => void;
}

export default function WaveformToolbar({
  onZoomIn, onZoomOut, onFitAll, onAddMarker,
  showGrid, onToggleGrid, cursorTime, scale: _scale,
  markers: _markers, onRemoveMarker: _onRemoveMarker,
}: Props) {
  return (
    <div className="wv-toolbar">
      <div className="wv-toolbar-left">
        {/* Simulation controls */}
        <div className="wv-toolbar-group">
          <button className="wv-tb-btn wv-tb-btn-green" title="Run">▶ Run</button>
          <button className="wv-tb-btn" title="Pause">⏸ Pause</button>
          <button className="wv-tb-btn wv-tb-btn-red" title="Stop">⏹ Stop</button>
        </div>

        <div className="wv-toolbar-sep" />

        {/* Navigation */}
        <div className="wv-toolbar-group">
          <button className="wv-tb-btn" title="Step back">◀ Step</button>
          <button className="wv-tb-btn" title="Step forward">Step ▶</button>
        </div>

        <div className="wv-toolbar-sep" />

        {/* Cursor tools */}
        <div className="wv-toolbar-group">
          <button className="wv-tb-btn wv-tb-btn-active" title="Cursor">🔍 Cursor</button>
          <button className="wv-tb-btn" title="Measure">📏 Measure</button>
          <button className="wv-tb-btn" title="Lock">🔒 Lock</button>
        </div>

        <div className="wv-toolbar-sep" />

        {/* Zoom */}
        <div className="wv-toolbar-group">
          <button className="wv-tb-btn" onClick={onZoomIn} title="Zoom In">🔍+</button>
          <button className="wv-tb-btn" onClick={onZoomOut} title="Zoom Out">🔍-</button>
          <button className="wv-tb-btn" onClick={onFitAll} title="Fit All">⊞ Fit</button>
        </div>

        <div className="wv-toolbar-sep" />

        {/* Grid & Markers */}
        <div className="wv-toolbar-group">
          <button
            className={`wv-tb-btn ${showGrid ? "wv-tb-btn-active" : ""}`}
            onClick={onToggleGrid}
            title="Toggle Grid"
          >
            # Grid
          </button>
          <button className="wv-tb-btn" onClick={onAddMarker} title="Add Marker">
            📌 Mark
          </button>
        </div>
      </div>

      <div className="wv-toolbar-right">
        <span className="wv-tb-cursor-display">
          <span className="wv-tb-cursor-icon">T</span> = {cursorTime} ns
        </span>
      </div>
    </div>
  );
}
