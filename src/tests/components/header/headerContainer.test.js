import React from 'react';
import { shallow } from 'enzyme';

import { HeaderContainer } from '../../../components/header/HeaderContainer';

it('renders without crashing', () => {
  const wrapper = shallow(<HeaderContainer />);
  expect(wrapper.exists()).toBe(true);
});
