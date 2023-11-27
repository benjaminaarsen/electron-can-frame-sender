import { Form } from 'react-bootstrap';

function SendSwitch() {
  return (
    <div className="form-check form-switch form-switch-md me-2">
      <input
        type="checkbox"
        role="switch"
        name="can-send-switch"
        id="can-send-switch"
        className="form-check-input"
      />
    </div>
  );
}

export default function CanButtons() {
  return (
    <div className="mb-3 d-flex align-items-center">
      <SendSwitch />
      <Form.Label className="m-0">Send CAN messages</Form.Label>
    </div>
  );
}
