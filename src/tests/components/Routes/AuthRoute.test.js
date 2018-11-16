import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import AuthRoute from '../../../components/routes/AuthRoute';
import CreateArticle from '../../../components/article/createArticle/createArticle';

jest.mock('react-router-dom');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  location: { pathname: '/article/new' },
};
const store = mockStore({ ...{ login: { isAuthenticated: true } } });

test('renders AuthRoute component without crashing', () => {
  const wrapper = mount(<AuthRoute location={props.location}
    path="/article/new"
    component={ CreateArticle }
    store={store}/>);
  expect(wrapper).toBeDefined();
});
