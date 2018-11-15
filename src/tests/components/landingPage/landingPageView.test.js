import React from 'react';
import { shallow } from 'enzyme';

import LandingPageView from '../../../components/landingPage/LandingPageView';

const propSet1 = {
  userIsAuthenticated: false,
  handleFetchArticlePage: jest.fn(),
  loadingArticles: false,
  ptags: []
};

const propSet2 = {
  ...propSet1,
  loadingArticles: true
};

it('renders without crashing', () => {
  const wrapper = shallow(<LandingPageView {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders with loading state', () => {
  const wrapper = shallow(<LandingPageView {...propSet2} />);
  expect(wrapper.exists()).toBe(true);
});

it('fetches next page of featured articles', () => {
  const wrapper = shallow(<LandingPageView {...propSet1} />);
  wrapper.find('.js-next-btn').simulate('click');
  expect(propSet1.handleFetchArticlePage).toHaveBeenCalledWith(1);
});

it('fetches previous page of featured articles', () => {
  const wrapper = shallow(<LandingPageView {...propSet1} />);
  wrapper.find('.js-prev-btn').simulate('click');
  expect(propSet1.handleFetchArticlePage).toHaveBeenCalledWith(-1);
});
