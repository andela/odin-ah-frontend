import React from 'react';
import { shallow } from 'enzyme';
import StastisticsView from '../../../components/statistics/StastisticsView';

it('renders without crashing', () => {
  const wrapper = shallow(<StastisticsView />);
  expect(wrapper.exists()).toBe(true);
});
