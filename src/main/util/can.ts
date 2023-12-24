import Can from '@csllc/cs-pcan-usb';

export const can = new Can({
  canRate: 1000000,
  loopback: false,
});

let devices: any[] = [];
let currentDevice: any = null;

export type CanData = {
  id: number;
  ext: boolean;
  buf: Buffer;
};

export const updateDevices = async () => {
  devices = await can.list();
  // console.log(devices);
};

export const getDevices = () => {
  return devices;
};

export const getCurrentDevice = () => {
  return currentDevice;
};

export const setCurrentDevice = (device: any) => {
  currentDevice = device;
};

export const sendData = async (data: CanData) => {
  try {
    await can.write(data);
  } catch (error) {
    console.error(error);
  }
};
