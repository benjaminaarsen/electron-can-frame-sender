import React, { CSSProperties, useEffect, useState } from 'react';
import { DbcData, Message } from 'dbc-can/lib/dbc/Dbc';
import { Container } from 'react-bootstrap';
import Messages from './components/Messages/Messages';
import CanButtons from './components/CanButtons/CanButtons';
// import { CanData } from '../../../../main/util/can';
import { messageDataStore } from './MessageData';

function DbcView() {
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  const containerStyle: CSSProperties = {
    top: '10vh',
    height: '85vh',
    overflowY: 'scroll',
    // position: 'absolute',
  };
  useEffect(() => {
    window.api
      .getDbcData()
      .then((d: DbcData) => {
        return setMessages(d.messages);
      })
      .catch(console.log);
  }, []);
  messages.forEach((message: Message) => {
    messageDataStore.set(message.id, new Map());
    message.signals.forEach((signal) => {
      messageDataStore.get(message.id)?.set(signal.name, 0);
    });
  });
  console.log(messageDataStore);
  return (
    <Container fluid className="mt-3">
      <Container fluid style={containerStyle}>
        <CanButtons />
        <Messages messages={messages} />
      </Container>
    </Container>
  );
}

export default DbcView;
