import React, { FormEvent } from 'react';
import './App.css';

import socket from '../../services/socket';

class App extends React.Component {
  state = {
    value: ''
  };

  inputChanged = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value
    })
  }

  buttonClicked = () => {
    const username = this.state.value;
    if (username.trim() === '') {
      console.log('Username vazio!');
    }
    else {
      socket.emit('register username', this.state.value);
      console.log('enviado!');
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Bem-vindo ao chat mais legal do mercado!</h1>
        <div className="panel">
          <div className="input-form">
            <label htmlFor="username">
              Username:
            </label>
            <input
              onChange={e => this.inputChanged(e)}
              value={this.state.value}
              type="text"
              id="username"
            />
          </div>
          <button onClick={this.buttonClicked}>Enviar</button>
        </div>
      </div>
    );
  }
}

export default App;
