
import type { VCDSignal } from "./types";

interface Props {
  signals: VCDSignal[];
  visibleSignals: string[];
  toggleSignal: (sig: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  signalColors: Record<string, string>;
  selectedSignal: string | null;
  onSelectSignal: (sig: string | null) => void;
}

export default function SignalPanel({
  signals, visibleSignals, toggleSignal,
  searchQuery, onSearchChange, signalColors,
  selectedSignal, onSelectSignal,
}: Props) {
  const filtered = signals.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDisplayType = (sig: VCDSignal) => {
    if (sig.size && sig.size > 1) return "BUS";
    return sig.type?.toUpperCase() || "WIRE";
  };

  const getValueDisplay = (sig: VCDSignal) => {
    if (sig.size && sig.size > 1) return "HEX";
    return "HEX";
  };

  return (
    <div className="wv-signal-panel">
      {/* Header */}
      <div className="wv-sp-header">
        <span className="wv-sp-title">SCOPE BROWSER</span>
        <button className="wv-sp-refresh" title="Refresh">&#x21bb;</button>
      </div>

      {/* Search */}
      <div className="wv-sp-search">
        <input
          type="text"
          placeholder="Search signals.."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="wv-sp-search-input"
        />
      </div>

      {/* Tabs */}
      <div className="wv-sp-tabs">
        <button className="wv-sp-tab wv-sp-tab-active">Hierarchy</button>
        <button className="wv-sp-tab">All</button>
        <button className="wv-sp-tab">Recent</button>
      </div>

      {/* Signals header row */}
      <div className="wv-sp-signals-header">
        <span>SIGNALS {filtered.length}</span>
        <button className="wv-sp-close-btn">&times;</button>
      </div>

      {/* Signal list */}
      <div className="wv-sp-list">
        {filtered.map((sig, i) => {
          const isVisible = visibleSignals.includes(sig.name);
          const isSelected = selectedSignal === sig.name;
          const color = signalColors[sig.name] || "#3b82f6";

          return (
            <div
              key={`${sig.name}_${i}`}
              className={`wv-sp-item ${isSelected ? "wv-sp-item-selected" : ""}`}
              onClick={() => onSelectSignal(isSelected ? null : sig.name)}
            >
              <div
                className="wv-sp-color-dot"
                style={{ backgroundColor: isVisible ? color : "#4a5568" }}
              />
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSignal(sig.name);
                }}
                className="wv-sp-checkbox"
              />
              <span className="wv-sp-name">{sig.name}</span>
              <span className="wv-sp-type">{getDisplayType(sig)}</span>
              <span className="wv-sp-value">{getValueDisplay(sig)}</span>
              {sig.size && sig.size > 1 && (
                <span className="wv-sp-size">[{sig.size}]</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
