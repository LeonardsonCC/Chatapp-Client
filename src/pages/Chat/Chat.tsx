import React, { useState } from 'react';

import './styles.css';
import { sendNewMessage, subscribeToNewMessage } from '../../services/socket';

interface Messages {
    user_id: number,
    username: string,
    message_id: number,
    message: string,
}

const Chat: React.FC = () => {
    const [value, setValue] = useState('');
    const [messageList, setMessageList] = useState<Messages[]>([]);
    
    const addNewMessage = (message: Messages) => {
        let new_messageList = [...messageList];
        new_messageList.push(message);
        setMessageList(new_messageList);
    }

    subscribeToNewMessage((message: Messages) => {
        addNewMessage(message);
    });

    return (
        <div className="Chat">
            <ul className="chat-box">
                {
                    messageList.map((item) => (
                        <li key={item.message_id}>{item.username}: {item.message}</li>
                    ))
                }
            </ul>
            <div className="input-group">
                <input type="text" placeholder="Type something..."
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onKeyUp={(event) => event.keyCode === 13 ? sendNewMessage(value) : null}/>
            </div>
        </div>
    )
}

export default Chat;