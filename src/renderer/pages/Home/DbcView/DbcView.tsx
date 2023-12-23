import { CSSProperties, useEffect, useState } from 'react';
import { Message } from 'dbc-can/lib/dbc/Dbc';
import { Container } from 'react-bootstrap';
import Messages from './components/Messages/Messages';
import CanButtons from './components/CanButtons/CanButtons';
import messageDataStore from './MessageData';
import { SignalData } from '../../../../shared/CanDataStore';

function DbcView() {
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  const containerStyle: CSSProperties = {
    top: '10vh',
    height: '85vh',
    overflowY: 'scroll',
    // position: 'absolute',
  };
  const updateMessages = async () => {
    const dbcData = await window.api.getDbcData();
    setMessages(dbcData.messages);
  };

  useEffect(() => {
    updateMessages();
    return window.api.onDbcFileLoaded(async () => {
      await updateMessages();
    });
  }, []);

  useEffect(() => {
    messages.forEach((message: Message) => {
      messageDataStore.set(message.id, new Map());
      message.signals.forEach((signal) => {
        messageDataStore.get(message.id)?.set(signal.name, {
          value: 0,
          factor: signal.factor,
          length: signal.length,
          startBit: signal.startBit,
        } as SignalData);
      });
    });
  }, [messages]);
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
