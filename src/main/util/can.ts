import Can from '@csllc/cs-pcan-usb';

export const can = new Can({
  canRate: 250000,
});

let devices: any[] = [];
let currentDevice: any = null;

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
