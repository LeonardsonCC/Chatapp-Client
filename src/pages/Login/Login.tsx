import React, { useState, FormEvent } from 'react';
import './styles.css';
import { Redirect } from 'react-router';

import { SESSION_KEY, newAuthentication, isAuthenticated } from '../../services/auth';
import { subscribeToUserSignIn } from '../../services/socket';


interface IProps {
  changePage: (page: string) => void
}

const Login: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('');

  const inputChanged = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const buttonClicked = () => {
    const username = value;
    newAuthentication(username);
    subscribeToUserSignIn((session:string) => {
      sessionStorage.setItem(SESSION_KEY, session);
    });
  }

  return (
    <div className="Login">
      {
        (isAuthenticated()) ?
          <Redirect to="/chat" /> :
          null
      }
      <h1 className="title">Bem-vindo ao chat!</h1>
      <div className="input-group">
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
      <button className="submit" onClick={buttonClicked}>Enviar</button>
    </div>
  );
}

export default Login;