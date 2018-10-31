import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Toast from './notification/toast';
import Modal from './modal';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>

      <Toast/>
      <Modal/>
    </div>
  );
}
