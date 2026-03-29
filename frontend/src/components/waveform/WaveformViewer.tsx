import { useEffect, useState, useCallback, useMemo } from "react";
import SignalPanel from "./SignalPanel";
import WaveformCanvas from "./WaveformCanvas";
import Timeline from "./Timeline";
import CursorOverlay from "./CursorOverlay";
import ValueChangeList from "./ValueChangeList"
import WaveformToolbar from "./WaveformToolbar";
import type { VCDData, VCDSignal, Marker, ValueChange } from "./types";
import "./waveform.css";

interface Props {
  vcdData: VCDData | null;
}

export default function WaveformViewer({ vcdData }: Props) {
  const allSignals: VCDSignal[] = vcdData?.signal || [];
  const signalNames = allSignals.map((s) => s.name);

  const [visibleSignals, setVisibleSignals] = useState<string[]>(signalNames);
  const [scale, setScale] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [cursorTime, setCursorTime] = useState<number>(0);
  const [cursorX, setCursorX] = useState<number>(0);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);

  useEffect(() => {
    setOffsetX(0);
    setScale(0);
    setVisibleSignals(signalNames);
  }, [vcdData]);

  const toggleSignal = useCallback((sig: string) => {
    setVisibleSignals((prev) =>
      prev.includes(sig) ? prev.filter((s) => s !== sig) : [...prev, sig]
    );
  }, []);

  const addMarker = useCallback(() => {
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
    setMarkers((prev) => [
      ...prev,
      {
        id: Date.now(),
        time: cursorTime,
        color: colors[prev.length % colors.length],
      },
    ]);
  }, [cursorTime]);

  const removeMarker = useCallback((id: number) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => (prev === 0 ? 1.5 : prev * 1.2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => (prev === 0 ? 0.7 : prev * 0.8));
  }, []);

  const handleFitAll = useCallback(() => {
    setScale(0);
    setOffsetX(0);
  }, []);

  // Build value change list for the right panel
  const valueChanges: ValueChange[] = useMemo(() => {
    if (!vcdData) return [];
    const changes: ValueChange[] = [];
    const symbolMap: Record<string, string> = {};
    allSignals.forEach((s) => { symbolMap[s.symbol] = s.name; });

    const sorted = [...(vcdData.changes || [])].sort((a, b) => a[0] - b[0]);
    const lastVal: Record<string, string> = {};

    sorted.forEach((c) => {
      // const [time, symbol, value] = c;
      const time = c[0]
      const symbol = c[1]
      const value = c[2]
      const name = symbolMap[symbol] || symbol;
      const prev = lastVal[symbol] || "0x0";
      const edge = prev < value ? "\u2191" : prev > value ? "\u2193" : "\u2194";

      const fmtVal = (v: string) => {
        if (v.startsWith("b")) {
          return "0x" + parseInt(v.slice(1), 2).toString(16).toUpperCase();
        }
        return "0x" + v;
      };

      changes.push({
        time,
        signal: name,
        edge,
        from: fmtVal(prev),
        to: fmtVal(value),
        duration: 0,
      });
      lastVal[symbol] = value;
    });

    // Calculate durations
    for (let i = 0; i < changes.length - 1; i++) {
      if (changes[i].signal === changes[i + 1]?.signal) {
        changes[i].duration = changes[i + 1].time - changes[i].time;
      }
    }

    return changes;
  }, [vcdData, allSignals]);

  const maxTime = useMemo(() => {
    if (!vcdData?.changes?.length) return 100;
    return Math.max(...vcdData.changes.map((c) => c[0]), 1);
  }, [vcdData]);

  // Signal color assignment
  const signalColors = useMemo(() => {
    const palette = [
      "#3b82f6", "#10b981", "#ef4444", "#f59e0b",
      "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16",
      "#f97316", "#6366f1", "#14b8a6", "#e11d48",
    ];
    const map: Record<string, string> = {};
    allSignals.forEach((s, i) => {
      map[s.name] = palette[i % palette.length];
    });
    return map;
  }, [allSignals]);

  if (!vcdData) {
    return (
      <div className="wv-empty">
        <div className="wv-empty-icon">〰️</div>
        <div className="wv-empty-text">No waveform data loaded</div>
        <div className="wv-empty-sub">Click RUN to simulate and generate waveforms</div>
      </div>
    );
  }

  return (
    <div className="wv-root">
      {/* Top Toolbar */}
      <WaveformToolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitAll={handleFitAll}
        onAddMarker={addMarker}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        cursorTime={cursorTime}
        scale={scale}
        markers={markers}
        onRemoveMarker={removeMarker}
      />

      <div className="wv-body">
        {/* Left: Signal Panel */}
        <SignalPanel
          signals={allSignals}
          visibleSignals={visibleSignals}
          toggleSignal={toggleSignal}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          signalColors={signalColors}
          selectedSignal={selectedSignal}
          onSelectSignal={setSelectedSignal}
        />

        {/* Center: Timeline + Waveforms */}
        <div className="wv-center">
          <Timeline scale={scale} offsetX={offsetX} maxTime={maxTime} />
          <div className="wv-canvas-wrap">
            <WaveformCanvas
              signals={visibleSignals}
              vcdData={vcdData}
              scale={scale}
              setScale={setScale}
              offsetX={offsetX}
              setOffsetX={setOffsetX}
              onCursorMove={(time, x) => {
                setCursorTime(time);
                setCursorX(x);
              }}
              markers={markers}
              showGrid={showGrid}
              signalColors={signalColors}
              selectedSignal={selectedSignal}
            />
            <CursorOverlay time={cursorTime} x={cursorX} />
          </div>
        </div>

        {/* Right: Value Change List */}
        <ValueChangeList
          changes={valueChanges}
          cursorTime={cursorTime}
          signalColors={signalColors}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="wv-statusbar">
        <span>T1: {cursorTime} ns</span>
        <span className="wv-statusbar-sep">|</span>
        <span>ZOOM {scale === 0 ? "FIT" : scale.toFixed(2) + "x"}</span>
        <span className="wv-statusbar-sep">|</span>
        <span>MODE Free</span>
        <span className="wv-statusbar-sep">|</span>
        <span>SIGNALS {visibleSignals.length}/{signalNames.length}</span>
        <span className="wv-statusbar-sep">|</span>
        <span>MARKERS {markers.length}</span>
        <div className="wv-statusbar-right">
          <span>Visible: {valueChanges.length}</span>
        </div>
      </div>
    </div>
  );
}