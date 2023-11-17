import { CSSProperties, JSX, useEffect, useState } from 'react';
import { DbcData, Message } from 'dbc-can/lib/dbc/Dbc';
import { Card, Container, Form } from 'react-bootstrap';

function Cards({ messages }: { messages: Map<string, Message> }) {
  const cards: JSX.Element[] = [];
  const signals: JSX.Element[] = [];
  messages.forEach((message) => {
    message.signals.forEach((signal) => {
      signals.push(
        <span className="d-flex justify-content-between">
          {signal.length === 1 ? (
            <>
              <Form.Label className="text-wrap w-90">{`${signal.name}`}</Form.Label>
              <Form.Check type="checkbox" />
            </>
          ) : (
            <>
              <Form.Label className="text-wrap w-70">{`${signal.name}`}</Form.Label>
              <Form.Control
                className="w-30"
                type="number"
                min={0}
                max={2 ** signal.length - 1}
              />
            </>
          )}
        </span>,
      );
    });

    cards.push(
      <Card
        key={message.name}
        className="g-col-md-4 g-col-xl-3 shade-0 border-0"
      >
        <Card.Body>
          <Card.Title>{`${message.name} 0x${message.id.toString(
            16,
          )}`}</Card.Title>
          {signals}
        </Card.Body>
      </Card>,
    );
  });
  return cards;
}

function DbcView() {
  const containerStyle: CSSProperties = { paddingTop: '75px' };
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  useEffect(() => {
    window.api
      .getDbcData()
      .then((d: DbcData) => {
        return setMessages(d.messages);
      })
      .catch(console.log);
  });
  return (
    <Container style={containerStyle} className="grid">
      <Cards messages={messages} />
    </Container>
  );
}

export default DbcView;
