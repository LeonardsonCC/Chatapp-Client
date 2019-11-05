import React, { useState, FormEvent } from 'react';
import socket from '../../services/socket';
import { Redirect } from 'react-router';

interface IProps {
    changePage: (page: string) => void
}

const Login: React.FC<IProps> = (props) => {
    const [value, setValue] = useState('');
    const [session, setSession] = useState('');

    const inputChanged = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const buttonClicked = () => {
        const username = value;
        if (username.trim() === '') {
          console.log('Username vazio!');
        }
        else {
          socket.emit('register username', value);
          socket.on('register username success', (session:string) => {
            if (session !== '') {
              setSession(session);
            }
            sessionStorage.setItem('session', session);
          });
        }
      }

    return (
        <div>
            {
                session !== '' ?
                    <Redirect to="/chat" /> :
                    null
            }
            <h1>Bem-vindo ao chat mais legal do mundo!</h1>
            <div className="panel">
                <div className="input-form">
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    onChange={e => inputChanged(e)}
                    value={value}
                    type="text"
                    id="username"
                />
                </div>
                <button onClick={buttonClicked}>Enviar</button>
            </div>
        </div>
    );
}

export default Login;