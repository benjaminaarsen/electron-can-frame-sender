import { Message } from 'dbc-can/lib/dbc/Dbc';
import React from 'react';
import Cards from './components/Cards';

export default function Messages({
  messages,
}: {
  messages: Map<string, Message>;
}) {
  return (
    <div className="grid">
      <Cards messages={messages} />
    </div>
  );
}
