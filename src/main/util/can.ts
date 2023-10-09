import Can from '@csllc/cs-pcan-usb';

const can = new Can({
  canRate: 250000,
});

export default can;
