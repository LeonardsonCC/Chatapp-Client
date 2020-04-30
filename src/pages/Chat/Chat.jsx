import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, getUsername } from '../../services/auth';

import './styles.css';
import { sendNewMessage, subscribeToNewMessage } from '../../services/socket';

const Chat = () => {
  const [value, setValue] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("")

  const addNewMessage = message => {
    let new_messageList = [...messageList];
    new_messageList.push(message);
    setMessageList(new_messageList);
  };

  const keyUpHandler = event => {
    if (event.keyCode === 13) {
      sendNewMessage(value);
      setValue('');
    }
  }

  subscribeToNewMessage(message => {
    addNewMessage(message);
  });

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  else if (username !== "") {
    const username_got = getUsername();
    setUsername(username_got);
  }
  console.log(username)
  return (
    <div className="Chat">
      <ul className="chat-box">
        {messageList.map(item => (
          <li style={{ color: (username === item.username ? 'red' : 'black') }} key={item.message_id}>
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
          onKeyUp={(e) => keyUpHandler(e)}
        />
      </div>
    </div>
  );
};

export default Chat;
