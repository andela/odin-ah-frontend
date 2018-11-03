import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Toast from './notification/toast';
import Modal from './modal';
import CreateArticle from './article/createArticle/createArticle';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/article/add' component={CreateArticle} />
      </Switch>

      <Toast/>
      <Modal/>
    </div>
  );
}
