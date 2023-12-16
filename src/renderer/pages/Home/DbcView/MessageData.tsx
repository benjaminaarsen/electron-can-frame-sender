export type SignalDataStore = Map<string, number>;
export type MessageDataStore = Map<number, SignalDataStore>;

export const messageDataStore: MessageDataStore = new Map();
