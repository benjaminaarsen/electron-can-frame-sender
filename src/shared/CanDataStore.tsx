export type Signal = {
  factor: number;
  length: number;
  startBit: number;
  value: number;
};

export type SignalDataStore = Map<string, Signal>;
export type MessageDataStore = Map<number, SignalDataStore>;
