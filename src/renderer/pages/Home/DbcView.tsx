import { DbcData } from 'dbc-can/lib/dbc/Dbc';
import { JSX } from 'react';

let data: DbcData;

export function setData(newData: DbcData) {
  data = newData;
  console.log(data.messages);
}

function DbcView() {
  const elements: JSX.Element[] = [];

  data.messages.forEach((message) => {
    elements.push(
      <div key={message.id}>
        <h2>{message.name}</h2>
        <p>{message.id}</p>
        <p>{message.description}</p>
        <p>{message.dlc}</p>
      </div>,
    );
  });
  return elements;
}

export default DbcView;
