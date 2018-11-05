import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/HomeContainer';

export default function Root() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
