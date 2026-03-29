
import type { Marker } from "./types";

interface Props {
  markers: Marker[];
}

export default function MarkerLayer({ markers:_markers }: Props) {
  // Markers are now rendered inside the PixiJS canvas for precision.
  // This component is kept for backward compatibility.
  return null;
}


