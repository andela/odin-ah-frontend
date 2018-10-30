import React from 'react';
import { shallow } from 'enzyme';
import Home from '../components/home/ Home';

it('renders Todos without crashing', () => {
  const wrapper = shallow(<Home />);
  const homeHeader = <h1 >Home page</h1>;
  expect(wrapper.contains(homeHeader))
    .toEqual(true);
});
