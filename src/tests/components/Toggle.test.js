import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../../components/toggle/index';

test('renders Root component without crashing', () => {
  const wrapper = shallow(<Toggle />);
  expect(wrapper.find('input')).toHaveLength(1);
});
