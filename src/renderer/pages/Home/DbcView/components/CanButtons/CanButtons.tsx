import { Form, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { setFrequency, startSending, stopSending } from '../../SendData';

function SendSwitch() {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getStatus = async () => {
      const status = await window.api.getStatus();
      setDisabled(!status);
    };
    getStatus();
  }, []);

  useEffect(() => {
    return window.api.onDeviceOpened(() => {
      console.log('device opened');
      setDisabled(false);
    });
  });

  useEffect(() => {
    return window.api.onDeviceClosed(() => {
      console.log('device closed');
      setDisabled(true);
    });
  });

  return (
    <div className="form-check form-switch form-switch-md">
      <input
        type="checkbox"
        role="switch"
        name="can-send-switch"
        id="can-send-switch"
        disabled={disabled}
        className="form-check-input"
        onChange={(e) => {
          console.log(e.target.checked);
          if (e.target.checked) {
            startSending();
          } else {
            stopSending();
          }
        }}
      />
    </div>
  );
}

function FrequencyField() {
  return (
    <div className="input-group form-inline input-group w-20">
      <span className="input-group-text">Frequency (Hz)</span>
      <input
        type="number"
        className="form-control"
        aria-label="Frequency"
        defaultValue={200}
        onChange={(e) => {
          const freq = +(e.target as HTMLInputElement).value;
          setFrequency(freq);
        }}
      />
    </div>
  );
}

export default function CanButtons() {
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="mb-3 border rounded p-2 shade-0"
    >
      <>
        <Form.Label className="m-0">Send CAN messages</Form.Label>
        <SendSwitch />
      </>
      <FrequencyField />
    </Stack>
  );
}
