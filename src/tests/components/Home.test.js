import React from 'react';
import { shallow } from 'enzyme';
import HomeView from '../../components/Home/HomeView';

it('renders HomeView without crashing', () => {
  const wrapper = shallow(<HomeView />);
  expect(wrapper).toMatchSnapshot();
});
