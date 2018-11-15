import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ConnectedLandingPageContainer, {
  LandingPageContainer
} from '../../../components/landingPage/LandingPageContainer';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const propSet1 = {
  userIsAuthenticated: false,
  openModal: jest.fn(),
  registerUser: jest.fn(),
  userLoginRequest: jest.fn(),
  articles: [],
  tags: [],
  fetchArticles: jest.fn(),
  fetchPtags: jest.fn(),
  fetchArticlePage: jest.fn(),
  loadingArticles: false
};

const storeState = {
  landingPageArticles: { articlesInView: [], loadingArticles: false },
  landingPageTags: { tags: [] },
  login: { isAuthenticated: true }
};

const propSet2 = {
  ...propSet1,
  userIsAuthenticated: true
};

it('should render landing page when user is not authenticated', () => {
  const wrapper = shallow(<LandingPageContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should open login modal when user is not authenticated', () => {
  const wrapper = shallow(<LandingPageContainer {...propSet1} />);
  wrapper.instance().handleLoginModal();
  expect(wrapper.state().showLoginModal).toBe(true);
});

it('should open registration modal when user is not authenticated', () => {
  const wrapper = shallow(<LandingPageContainer {...propSet1} />);
  wrapper.instance().openRegistrationModalComponent();
  expect(wrapper.prop('openModal')).toHaveBeenCalled;
});

it('should fetch article page when user is not authenticated', () => {
  const wrapper = shallow(<LandingPageContainer {...propSet1} />);
  wrapper.instance().handleFetchArticlePage();
  expect(wrapper.prop('fetchArticlePage')).toHaveBeenCalled;
});

it('should redirect when user is authenticated', () => {
  const wrapper = shallow(<LandingPageContainer {...propSet2} />);
  expect(wrapper.exists()).toBe(true);
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedLandingPageContainer {...propSet1} store={store} />);
  expect(wrapper.prop('userIsAuthenticated')).toBe(true);
});
