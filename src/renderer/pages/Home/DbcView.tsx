import { CSSProperties, JSX, useEffect, useState } from 'react';
import { DbcData, Message } from 'dbc-can/lib/dbc/Dbc';
import { Card, Container } from 'react-bootstrap';

function Cards({ messages }: { messages: Map<string, Message> }) {
  const cards: JSX.Element[] = [];
  const signals: JSX.Element[] = [];
  messages.forEach((message) => {
    message.signals.forEach((signal) => {
      signals.push(
        <Card
          key={`${signal.name} ${message.id}`}
          className="g-col-4 shade-2 border-0 m-3"
        >
          <Card.Text>{signal.name}</Card.Text>
          <Card.Text>{signal.description}</Card.Text>
          <Card.Text>{signal.length}</Card.Text>
          <Card.Text>{signal.endian}</Card.Text>
          <Card.Text>{signal.dataType}</Card.Text>
          <Card.Text>{signal.factor}</Card.Text>
          <Card.Text>{signal.offset}</Card.Text>
          <Card.Text>{signal.unit}</Card.Text>
        </Card>,
      );
    });

    cards.push(
      <Card key={message.name} className="g-col-4 shade-0 border-0">
        <Card.Body>{signals}</Card.Body>
      </Card>,
    );
  });
  return cards;
}

function DbcView() {
  const containerStyle: CSSProperties = { paddingTop: '75px' };
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  useEffect(() => {
    window.api
      .getDbcData()
      .then((d: DbcData) => {
        setMessages(d.messages);
        return setLoading(false);
      })
      .catch(console.log);
  });
  if (loading) return null;
  return (
    <Container style={containerStyle} className="grid">
      <Cards messages={messages} />
    </Container>
  );
}

export default DbcView;
