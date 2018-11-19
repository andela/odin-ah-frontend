import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import GeustRoute from '../../../components/routes/GuestRoute';
import ResetPasswordForm from '../../../components/passwordReset/ResetPasswordForm';

jest.mock('react-router-dom');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  location: { pathname: '/article/new' },
};
const store = mockStore({ ...{ login: { isAuthenticated: false } } });

test('renders GuestRoute component without crashing', () => {
  const wrapper = mount(<GeustRoute location={props.location}
    path="/article/new"
    component={ ResetPasswordForm }
    store={store}/>);
  expect(wrapper).toBeDefined();
});
