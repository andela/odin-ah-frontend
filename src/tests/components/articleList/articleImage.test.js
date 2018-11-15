import React from 'react';
import { shallow } from 'enzyme';

import ArticleImage from '../../../components/articleList/ArticleImage';

it('renders without crashing when backgroundUrl is supplied', () => {
  const wrapper = shallow(<ArticleImage backgroundImageUrl={'someurl'} altText={'My alt text'} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders without crashing when backgroundUrl is not supplied', () => {
  const wrapper = shallow(<ArticleImage backgroundImageUrl={null} altText={'My alt text'} />);
  expect(wrapper.exists()).toBe(true);
});
