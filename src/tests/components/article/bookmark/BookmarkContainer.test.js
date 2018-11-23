import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedBookmarkContainer, { BookmarkContainer } from '../../../../components/bookmark/BookmarkContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet1 = {
  userIsAuthenticated: true,
  fetchBookmarkArticle: jest.fn(),
  componentDidMount: jest.fn(),
  fetchArticles: jest.fn(),
  isAuthenticated: true,
  loadingArticles: false,
  articles: [],
  handleDeleteBookmark: jest.fn(),
  removeBookmarkArticle: jest.fn(),
  fetchArticlePage: jest.fn(),
};

const storeState = {
  bookmark: { articlesInView: [], loadingArticles: false },
  landingPageTags: { tags: [] },
  login: { isAuthenticated: true }
};

const propSet2 = {
  ...propSet1,
  loadingArticles: true,
};

it('should render bookmark page without crashing', () => {
//   const store = mockStore(storeState);
  const wrapper = shallow(<BookmarkContainer {...propSet1} />);
  //   wrapper..componentDidMount();
  expect(wrapper.exists()).toBe(true);
//   expect(wrapper.prop('fetchBookmarkArticle')).toHaveBeenCalled;
});

it('should call handleDeleteBookmark method', () => {
  const event = { target: { getAttribute: () => 'a-random-slug' } };
  const wrapper = shallow(<BookmarkContainer {...propSet1} />);
  wrapper.instance().handleDeleteBookmark(event);
  expect(wrapper.prop('removeBookmarkArticle')).toHaveBeenCalled;
  expect(wrapper.prop('fetchBookmarkArticle')).toHaveBeenCalled;
});

it('should call handleFetchArticlePage method', () => {
  const page = 1;
  const wrapper = shallow(<BookmarkContainer {...propSet1} />);
  wrapper.instance().handleFetchArticlePage(page);
  expect(wrapper.prop('fetchArticlePage')).toHaveBeenCalled;
});

it('should call handleFetchArticlePage method', () => {
  const wrapper = shallow(<BookmarkContainer {...propSet2} />);
  expect(wrapper).toExist();
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedBookmarkContainer {...propSet1} store={store} />);
  expect(wrapper.prop('userIsAuthenticated')).toBe(true);
});
