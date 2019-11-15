import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import { userSession } from '../../services/auth';
import { sendMySession } from '../../services/socket';

const App = () => {
  if (userSession) {
    sendMySession(userSession);
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
