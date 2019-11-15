import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

import './styles.css';
import { sendNewMessage, subscribeToNewMessage } from '../../services/socket';

const Chat = () => {
  const [value, setValue] = useState('');
  const [messageList, setMessageList] = useState([]);

  const addNewMessage = message => {
    let new_messageList = [...messageList];
    new_messageList.push(message);
    setMessageList(new_messageList);
  };

  subscribeToNewMessage(message => {
    addNewMessage(message);
  });

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="Chat">
      <ul className="chat-box">
        {messageList.map(item => (
          <li key={item.message_id}>
            {item.username}: {item.message_text}
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          placeholder="Type something..."
          value={value}
          onChange={event => setValue(event.currentTarget.value)}
          onKeyUp={event =>
            event.keyCode === 13 ? sendNewMessage(value) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
