import { CSSProperties, JSX } from 'react';
import { DbcData, Message } from 'dbc-can/lib/dbc/Dbc';
import { Card, Container } from 'react-bootstrap';

let data: DbcData;

export function setData(newData: DbcData) {
  data = newData;
  console.log(data.messages);
}

function Cards({ messages }: { messages: Map<string, Message> }) {
  const elements: JSX.Element[] = [];
  messages.forEach((message) => {
    elements.push(
      <Card key={message.name} className="g-col-4 shade-color border-0">
        <Card.Body>
          <Card.Title>{message.name}</Card.Title>
          <Card.Text>{message.id}</Card.Text>
          <Card.Text>{message.description}</Card.Text>
          <Card.Text>{message.dlc}</Card.Text>
        </Card.Body>
      </Card>,
    );
  });
  return elements;
}

function DbcView() {
  const containerStyle: CSSProperties = { paddingTop: '75px' };
  return (
    <Container style={containerStyle} className="grid">
      <Cards messages={data.messages} />
    </Container>
  );
}

export default DbcView;
