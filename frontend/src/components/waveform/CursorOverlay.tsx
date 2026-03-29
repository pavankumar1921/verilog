
interface Props {
  time: number;
  x: number;
}

export default function CursorOverlay({ time, x }: Props) {
  return (
    <div className="wv-cursor-overlay">
      <div className="wv-cursor-badge">
        <span className="wv-cursor-icon">T</span>
        <span className="wv-cursor-eq">=</span>
        <span className="wv-cursor-time">{time}</span>
        <span className="wv-cursor-unit">ns</span>
      </div>
    </div>
  );
}
