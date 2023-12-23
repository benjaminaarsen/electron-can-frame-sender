export type SignalData = {
  factor: number;
  length: number;
  startBit: number;
  value: number;
};

export type SignalDataStore = Map<string, SignalData>;
export type MessageDataStore = Map<number, SignalDataStore>;
