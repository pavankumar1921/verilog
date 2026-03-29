

export interface VCDSignal {
  name: string;
  symbol: string;
  type?: string;
  size?: number;
}

export interface VCDChange {
  0: number;   // time
  1: string;   // symbol
  2: string;   // value
}

export interface VCDData {
  signal: VCDSignal[];
  changes: VCDChange[];
  endtime?: string;
  scale?: string;
}

export interface SignalGroup {
  name: string;
  signals: VCDSignal[];
  expanded: boolean;
}

export interface Marker {
  id: number;
  time: number;
  color: string;
}

export interface ValueChange {
  time: number;
  signal: string;
  edge: string;
  from: string;
  to: string;
  duration: number;
}