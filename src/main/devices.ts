const devices: any[] = [];

export const updateDevices = (newDevices: any[]) => {
  devices.length = 0;
  newDevices.forEach((device) => {
    devices.push(device);
  });
  console.log(devices);
};

export const getDevices = () => {
  return devices;
};
