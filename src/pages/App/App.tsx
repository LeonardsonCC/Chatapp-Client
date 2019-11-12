import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import { isAuthenticated, userSession } from '../../services/auth';
import { sendMySession } from '../../services/socket';

const App = (props: any) => {
  if (userSession) {
    sendMySession(userSession);
  }
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          {
            isAuthenticated() ?
              <Route path="/chat" component={Chat} /> :
              <Redirect to="/login" />
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
