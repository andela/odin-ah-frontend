import React from 'react';
import { shallow } from 'enzyme';

import FollowButtonView from '../../../components/users/FollowButtonView';

// User is not following
const followProps = {
  loading: false,
  text: 'Follow',
  onClickHandler: jest.fn(),
  styles: {}
};

// User is following
const unfollowProps = {
  loading: false,
  text: 'Unfollow',
  onClickHandler: jest.fn(),
  styles: {}
};

// Button is transitioning to new state
const loaderProps = {
  loading: true,
  text: '',
  onClickHandler: jest.fn(),
  styles: {}
};

it('renders without crashing', () => {
  const wrapper = shallow(<FollowButtonView />);
  expect(wrapper).toMatchSnapshot();
});

it('renders follow state', () => {
  const wrapper = shallow(<FollowButtonView {...followProps} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders with loading state', () => {
  const wrapper = shallow(<FollowButtonView {...loaderProps} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders unfollow state', () => {
  const wrapper = shallow(<FollowButtonView {...unfollowProps} />);
  expect(wrapper.exists()).toBe(true);
});

it('calls handler function on click events', () => {
  const wrapper = shallow(<FollowButtonView {...followProps} />);
  wrapper.find('.js-button-wrapper').simulate('click');
  expect(followProps.onClickHandler).toHaveBeenCalled();
});
