import React from 'react';
import { shallow } from 'enzyme';

import HeaderView from '../../../components/header/HeaderView';

it('renders without crashing', () => {
  const wrapper = shallow(<HeaderView />);
  expect(wrapper.exists()).toBe(true);
});
