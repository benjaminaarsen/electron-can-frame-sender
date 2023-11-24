import { Message } from 'dbc-can/lib/dbc/Dbc';
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
