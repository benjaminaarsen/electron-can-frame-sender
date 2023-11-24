import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function CanButtons() {
  const [sending, setSending] = useState(false);
  return (
    <div className="mb-3">
      <Button
        variant={sending ? 'success' : 'danger'}
        className="me-2"
        onClick={() => {
          setSending(!sending);
        }}
      >
        {sending ? 'Start sending' : 'Stop sending'}
      </Button>
    </div>
  );
}
