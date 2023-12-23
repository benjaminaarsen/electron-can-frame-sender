import { ChangeEvent, Fragment, JSX, memo, useCallback, useState } from 'react';
import { Message, Signal } from 'dbc-can/lib/dbc/Dbc';
import { Card, Form } from 'react-bootstrap';
import messageDataStore from '../../../MessageData';

const InputRange = memo(function InputRange({
  message,
  signal,
}: {
  message: Message;
  signal: Signal;
}) {
  const [rangeValue, setRangeValue] = useState(0);
  const handleChange = useCallback(
    (e: ChangeEvent) => {
      setRangeValue(+(e.target as HTMLInputElement).value);
      messageDataStore.get(message.id)?.set(signal.name, {
        value: +(e.target as HTMLInputElement).value,
        factor: signal.factor, // Assign a default value to factor
        length: signal.length, // Assign a default value to length
        startBit: signal.startBit, // Assign a default value to startBit
      });
    },
    [message.id, signal.name, signal.factor, signal.length, signal.startBit],
  );
  return (
    <>
      <span className="d-flex justify-content-between">
        <Form.Label className="text-wrap w-70">{`${signal.name}`}</Form.Label>
        <Form.Text className="text-wrap user-select-none">{`${rangeValue}`}</Form.Text>
      </span>
      <Form.Range
        key={`${signal.name} range`}
        value={rangeValue}
        min={signal.signed ? 2 ** signal.length / -2 : 0}
        max={
          signal.signed ? (2 ** signal.length - 1) / 2 : 2 ** signal.length - 1
        }
        onChange={handleChange}
      />
    </>
  );
});

const oneBitSignal = ({
  message,
  signal,
}: {
  message: Message;
  signal: Signal;
}) => {
  return (
    <span className="d-flex justify-content-between">
      <Form.Label className="text-wrap w-90">{`${signal.name}`}</Form.Label>
      <Form.Check
        onChange={(e) => {
          messageDataStore.get(message.id)?.set(signal.name, {
            value: (e.target as HTMLInputElement).checked ? 1 : 0,
            factor: signal.factor, // Assign a default value to factor
            length: signal.length, // Assign a default value to length
            startBit: signal.startBit, // Assign a default value to startBit
          });
        }}
        type="checkbox"
      />
    </span>
  );
};

const twoBitSignal = ({
  message,
  signal,
}: {
  message: Message;
  signal: Signal;
}) => {
  return (
    <>
      <span className="d-flex justify-content-between">
        <Form.Label className="text-wrap w-100">{`${signal.name}`}</Form.Label>
      </span>
      <Form className="d-flex justify-content-between">
        {[0, 1, 2, 3].map((i) => {
          return (
            <Form.Check
              key={`${signal.name} ${i}`}
              inline
              label={`${i}`}
              name={signal.name}
              type="radio"
              id={`inline-radio-${i}`}
              value={i}
              onChange={(e) => {
                messageDataStore.get(message.id)?.set(signal.name, {
                  value: +(e.target as HTMLInputElement).value,
                  factor: signal.factor, // Assign a default value to factor
                  length: signal.length, // Assign a default value to length
                  startBit: signal.startBit, // Assign a default value to startBit
                });
              }}
            />
          );
        })}
      </Form>
    </>
  );
};

function SignalsCard({
  message,
  signals,
}: {
  message: Message;
  signals: Signal[];
}) {
  return (
    <Card
      key={message.name}
      className="g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3 g-col-xxl-2 shade-0 border"
    >
      <Card.Body>
        <Card.Title>{`${message.name} 0x${message.id.toString(
          16,
        )}`}</Card.Title>
        {signals.map((signal) => {
          return (
            <Fragment key={signal.name}>
              {(() => {
                if (signal.length === 1) {
                  return oneBitSignal({ message, signal });
                }
                if (signal.length === 2) {
                  return twoBitSignal({ message, signal });
                }
                return <InputRange message={message} signal={signal} />;
              })()}
            </Fragment>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default function Cards({
  messages,
}: {
  messages: Map<string, Message>;
}) {
  const cards: JSX.Element[] = [];
  messages.forEach((message) => {
    const signals: Signal[] = [];
    message.signals.forEach((signal) => {
      signals.push(signal);
    });
    cards.push(
      <SignalsCard key={message.name} message={message} signals={signals} />,
    );
  });
  return cards;
}
