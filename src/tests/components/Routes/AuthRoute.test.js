import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import MockRouter from 'react-mock-router';
import AuthRoute from '../../../components/routes/AuthRoute';
import CreateArticle from '../../../components/article/createArticle/createArticle';

jest.mock('react-router-dom');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  location: { pathname: '/article/new' },
};
const store = mockStore({
  ...{
    login: { isAuthenticated: true },
    redirect: { redirectTo: 'url' }
  }
});

test('renders AuthRoute component without crashing', () => {
  const wrapper = mount(
    <AuthRoute
      location={props.location}
      path="/article/new"
      component={CreateArticle}
      store={store}/>
  );
  expect(wrapper)
    .toBeDefined();
});

test('renders AuthRoute component without crashing', () => {
  mount(
    <MockRouter>
      <AuthRoute
        redirectToReferrer={jest.fn()}
        location={props.location}
        path="/article/new"
        component={() => (<div/>)}
        store={store}/>
    </MockRouter>
  );
});
