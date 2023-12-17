import { Form, Stack } from 'react-bootstrap';

function SendSwitch() {
  return (
    <div className="form-check form-switch form-switch-md">
      <input
        type="checkbox"
        role="switch"
        name="can-send-switch"
        id="can-send-switch"
        className="form-check-input"
        onChange={(e) => {
          console.log(e.target.checked);
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
