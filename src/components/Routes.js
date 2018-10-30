import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/ Home';
import Login from './login/LoginForm';

export default function Root() {
  return (
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
  );
}
