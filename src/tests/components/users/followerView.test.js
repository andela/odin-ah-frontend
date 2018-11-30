import React from 'react';
import { shallow } from 'enzyme';

import FollowerListView from '../../../components/users/FollowerListView';
import FollowingListContainer from '../../../components/users/FollowingListContainer';
import FollowerListContainer from '../../../components/users/FollowerListContainer';

it('renders without crashing', () => {
  const wrapper = shallow(<FollowerListView />);
  expect(wrapper.exists()).toBe(true);
});

it('should render follower list container', () => {
  const followerListWrapper = shallow(<FollowerListView />);
  const followerListRenderProp = followerListWrapper
    .find(FollowerListContainer)
    .at(0)
    .renderProp('children', { total: 2 });
  expect(followerListRenderProp.exists()).toBe(true);
});

it('should render follower list container when not empty and not loading', () => {
  const props = {
    followerList: [{ userId: 1 }],
    loading: false,
    total: 1,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 1
  };
  const followerListWrapper = shallow(<FollowerListView />);
  const followerListRenderProp = followerListWrapper
    .find(FollowerListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followerListRenderProp.exists()).toBe(true);
});

it('should render follower list container when empty and not loading', () => {
  const props = {
    followerList: [{ userId: 1 }],
    loading: false,
    total: 0,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 1
  };
  const followerListWrapper = shallow(<FollowerListView />);
  const followerListRenderProp = followerListWrapper
    .find(FollowerListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followerListRenderProp.exists()).toBe(true);
});

it('should render follow list container when loading', () => {
  const props = {
    followerList: [{ userId: 1 }],
    loading: true,
    total: 1,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 2
  };
  const followerListWrapper = shallow(<FollowerListView />);
  const followerListRenderProp = followerListWrapper
    .find(FollowerListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followerListRenderProp.exists()).toBe(true);
});

it('should render following list container', () => {
  const followerListWrapper = shallow(<FollowerListView />);
  const followingListRenderProp = followerListWrapper
    .find(FollowingListContainer)
    .at(0)
    .renderProp('children', { total: 2 });
  expect(followingListRenderProp.exists()).toBe(true);
});
