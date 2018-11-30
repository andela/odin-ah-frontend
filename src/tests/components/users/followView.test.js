import React from 'react';
import { shallow } from 'enzyme';

import FollowListView from '../../../components/users/FollowListView';
import FollowingListContainer from '../../../components/users/FollowingListContainer';
import FollowerListContainer from '../../../components/users/FollowerListContainer';

it('renders without crashing', () => {
  const wrapper = shallow(<FollowListView />);
  expect(wrapper.exists()).toBe(true);
});

it('should render follow list container', () => {
  const followListWrapper = shallow(<FollowListView />);
  const followListRenderProp = followListWrapper
    .find(FollowingListContainer)
    .at(0)
    .renderProp('children', { total: 2 });
  expect(followListRenderProp.exists()).toBe(true);
});

it('should render second follow list container when not empty and not loading', () => {
  const props = {
    followList: [{ userId: 1 }],
    loading: false,
    total: 1,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 2
  };
  const followListWrapper = shallow(<FollowListView />);
  const followListRenderProp = followListWrapper
    .find(FollowingListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followListRenderProp.exists()).toBe(true);
});

it('should render second follow list container when empty and not loading', () => {
  const props = {
    followList: [{ userId: 1 }],
    loading: false,
    total: 0,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 1
  };
  const followListWrapper = shallow(<FollowListView />);
  const followListRenderProp = followListWrapper
    .find(FollowingListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followListRenderProp.exists()).toBe(true);
});

it('should render second follow list container when loading', () => {
  const props = {
    followList: [{ userId: 1 }],
    loading: true,
    total: 1,
    pageFetcher: jest.fn(),
    currentPage: 1,
    totalPages: 2
  };
  const followListWrapper = shallow(<FollowListView />);
  const followListRenderProp = followListWrapper
    .find(FollowingListContainer)
    .at(1)
    .renderProp('children', props);
  expect(followListRenderProp.exists()).toBe(true);
});

it('should render follower list container', () => {
  const followListWrapper = shallow(<FollowListView />);
  const followerListRenderProp = followListWrapper
    .find(FollowerListContainer)
    .at(0)
    .renderProp('children', { total: 2 });
  expect(followerListRenderProp.exists()).toBe(true);
});
