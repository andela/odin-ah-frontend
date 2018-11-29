import React from 'react';
import { mount } from 'enzyme';

import ScrollBar from '../../../components/article/readArticle/ScrollBar';

const eventMap = {};

window.addEventListener = jest.fn((eventName, callback) => {
  eventMap[eventName] = callback;
});

let wrapper;

beforeEach(() => {
  wrapper = mount(<ScrollBar/>);
});

afterEach(() => {
  wrapper.unmount();
});

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleScroll method on scroll', () => {
  eventMap.scroll();
});
