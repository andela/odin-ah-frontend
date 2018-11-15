import React from 'react';
import { shallow } from 'enzyme';

import NavBarDefault from '../../../components/header/NavBarDefault';

const propSet1 = {
  handleLogin: jest.fn(),
  handleSignup: jest.fn()
};

it('renders without crashing', () => {
  const wrapper = shallow(<NavBarDefault {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});
