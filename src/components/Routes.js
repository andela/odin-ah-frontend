import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/ Home';
import Login from './login/LoginForm';
import SignUp from './signup';

export default function Root() {
  return (
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={SignUp} />
      </Switch>
  );
}
