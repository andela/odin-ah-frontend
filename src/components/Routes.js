import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/LoginModal';
import SignUp from './signup';
import Home from './Home/HomeContainer';

export default function Root() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={SignUp} />
      <Route exact path='/' component={Login} />
    </Switch>
  );
}
