// import { MessageDataStore } from '../../../../shared/CanDataStore';
import messageDataStore from './MessageData';

let frequency: number = 200;
let sendinterval: number | undefined;

export const sendData = () => {
  window.api.sendData(messageDataStore);
  console.log('sending data to main');
};

export const setFrequency = (freq: number) => {
  frequency = freq;
};

export const startSending = () => {
  if (!sendinterval) {
    sendinterval = window.setInterval(sendData, 1000 / frequency);
  }
};

export const stopSending = () => {
  if (sendinterval) {
    window.clearInterval(sendinterval);
    sendinterval = undefined;
  }
};
