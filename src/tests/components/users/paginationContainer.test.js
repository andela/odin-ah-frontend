import React from 'react';
import { shallow } from 'enzyme';

import PaginationContainer from '../../../components/users/PaginationContainer';

const propSet1 = {
  totalPages: 1,
  pageFetcher: jest.fn(),
  currentPage: 1,
  limit: 10,
  children: jest.fn()
};

const propSet2 = {
  totalPages: 3,
  pageFetcher: jest.fn(),
  currentPage: 2,
  limit: 10,
  children: jest.fn()
};

it('should render without crashing when there are no pages to go', () => {
  const wrapper = shallow(<PaginationContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should render without crashing when there are pages to go', () => {
  const wrapper = shallow(<PaginationContainer {...propSet2} />);
  expect(wrapper.exists()).toBe(true);
});

it('should not go to the next page when page is last page', () => {
  const wrapper = shallow(<PaginationContainer {...propSet1} />);
  wrapper.instance().nextPage();
  expect(propSet1.pageFetcher).not.toHaveBeenCalled();
});

it('should go to the next page when page is not last page', () => {
  const wrapper = shallow(<PaginationContainer {...propSet2} />);
  wrapper.instance().nextPage();
  expect(propSet2.pageFetcher).toHaveBeenCalledWith(3, 10);
});

it('should not go to the prev page when page is first page', () => {
  const wrapper = shallow(<PaginationContainer {...propSet1} />);
  wrapper.instance().prevPage();
  expect(propSet1.pageFetcher).not.toHaveBeenCalled();
});

it('should go to the prev page when page is not last page', () => {
  const wrapper = shallow(<PaginationContainer {...propSet2} />);
  wrapper.instance().prevPage();
  expect(propSet2.pageFetcher).toHaveBeenCalledWith(1, 10);
});
