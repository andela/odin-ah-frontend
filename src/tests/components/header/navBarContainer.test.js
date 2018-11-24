import React from 'react';
import { shallow } from 'enzyme';

import { NavBarContainer } from '../../../components/header/NavBarContainer';

const propSet1 = {
  userIsAuthenticated: false
};

it('renders without crashing', () => {
  const wrapper = shallow(<NavBarContainer {...propSet1} />);
  expect(wrapper.exists())
    .toBe(true);
});
