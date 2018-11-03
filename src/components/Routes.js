import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Toast from './notification/toast';
import Modal from './modal';
import CreateArticle from './article/createArticle/createArticle';
import UpdateArticle from './article/updateArticle/updateArticle';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/article/add' component={CreateArticle} />
        <Route path='/article/edit/:slug' component={UpdateArticle} />
      </Switch>

      <Toast/>
      <Modal/>
    </div>
  );
}
