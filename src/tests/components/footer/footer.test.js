import React from 'react';
import { shallow } from 'enzyme';

import FooterView from '../../../components/footer/FooterView';

it('renders without crashing', () => {
  const wrapper = shallow(<FooterView />);
  expect(wrapper.exists()).toBe(true);
});
