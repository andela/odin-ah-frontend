import React from 'react';
import { shallow } from 'enzyme';

import FollowProfileCard from '../../../components/users/FollowProfileCard';
import FollowButtonContainer from '../../../components/users/FollowButtonContainer';

const props = {
  user: {
    imageUrl: 'imageUrl',
    username: 'username',
    bio: 'bio',
    userId: 1
  }
};

const props2 = {
  user: {
    imageUrl: null,
    username: 'username',
    bio: 'bio',
    userId: 1
  }
};

it('renders without crashing', () => {
  const wrapper = shallow(<FollowProfileCard {...props} />);
  expect(wrapper.exists()).toBe(true);
});

it('renders without crashing', () => {
  const wrapper = shallow(<FollowProfileCard {...props2} />);
  expect(wrapper.exists()).toBe(true);
});

it('should render follow button container when not loading', () => {
  const cardWrapper = shallow(<FollowProfileCard {...props} />);
  const followListRenderProp = cardWrapper
    .find(FollowButtonContainer)
    .at(0)
    .renderProp('children', { text: 'loading', loading: false, onClickHandler: jest.fn() });
  expect(followListRenderProp.exists()).toBe(true);
});

it('should render follow button container when loading', () => {
  const cardWrapper = shallow(<FollowProfileCard {...props} />);
  const followListRenderProp = cardWrapper
    .find(FollowButtonContainer)
    .at(0)
    .renderProp('children', { text: 'loading', loading: true, onClickHandler: jest.fn() });
  expect(followListRenderProp.exists()).toBe(true);
});
