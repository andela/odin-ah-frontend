import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../components/login/LoginForm';

it('renders Todos without crashing', () => {
  const wrapper = shallow(<LoginForm />);
  const loginHeader = <h1 >Login page</h1>;
  expect(wrapper.contains(loginHeader))
    .toEqual(true);
});
