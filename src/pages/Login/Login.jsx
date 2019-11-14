import React, { useState } from 'react';
import './styles.css';
import { Redirect } from 'react-router';

import { SESSION_KEY, newAuthentication } from '../../services/auth';
import { subscribeToUserSignIn } from '../../services/socket';

const Login = () => {
  const [value, setValue] = useState('');
  const [redirect, setRedirect] = useState(false);

  const inputChanged = (e) => {
    setValue(e.currentTarget.value);
  }

  const buttonClicked = () => {
    const username = value;
    newAuthentication(username);
    subscribeToUserSignIn((session) => {
      sessionStorage.setItem(SESSION_KEY, session);
      setRedirect(true);
    });
  }

  if (redirect) {
    return <Redirect to="/chat" />;
  }
  return (
    <div className="Login">
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