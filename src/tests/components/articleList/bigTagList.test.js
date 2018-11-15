import React from 'react';
import { shallow } from 'enzyme';

import BigTagList from '../../../components/articleList/BigTagList';

const tags = ['tag1', 'tag2'];

it('renders without crashing', () => {
  const wrapper = shallow(<BigTagList tags={tags} />);
  expect(wrapper.exists()).toBe(true);
});
