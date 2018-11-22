import React from 'react';
import { shallow } from 'enzyme';
import BookmarkView from '../../../../components/bookmark/BookmarkView';

const propSet1 = {
  userIsAuthenticated: true,
  fetchBookmarkArticle: jest.fn(),
  componentDidMount: jest.fn(),
  fetchArticles: jest.fn(),
  isAuthenticated: true,
  loadingArticles: false,
  articles: [],
  handleFetchArticlePage: jest.fn(),
  handleDeleteBookmark: jest.fn(),
  removeBookmarkArticle: jest.fn(),
  fetchArticlePage: jest.fn(),
};

it('renders BookmarkView without crashing', () => {
  const wrapper = shallow(<BookmarkView {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders BookmarkView without crashing', () => {
  const wrapper = shallow(<BookmarkView {...propSet1} />);
  wrapper.find('.js-next-btn').simulate('click');
  expect(propSet1.handleFetchArticlePage).toHaveBeenCalledWith(1);
});

it('fetches previous page of featured articles', () => {
  const wrapper = shallow(<BookmarkView {...propSet1} />);
  wrapper.find('.js-prev-btn').simulate('click');
  expect(propSet1.handleFetchArticlePage).toHaveBeenCalledWith(-1);
});
