export interface VCDSignal {
  name: string;
  symbol: string;
  type?: string;
  size?: number;
}

export interface VCDChange {
  0: number;
  1: string;
  2: string;
}

export interface VCDData {
  signal: VCDSignal[];
  changes: VCDChange[];
  endtime?: string;
  scale?: string;
}