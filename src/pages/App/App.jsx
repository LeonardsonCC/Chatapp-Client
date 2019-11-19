import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import { userSession, clearSession } from '../../services/auth';
import { sendMySession, subscribeSendMySessionResult } from '../../services/socket';

const App = () => {
  if (userSession) {
    sendMySession(userSession);
    subscribeSendMySessionResult(result => {
      if (result) {
        console.log('user logged!');
      }
      else {
        clearSession();
        return <Redirect to="/login" />
      }
    })
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
