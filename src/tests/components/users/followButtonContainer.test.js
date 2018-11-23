import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ConnectedFollowButtonContainer, {
  FollowButtonContainer
} from '../../../components/users/FollowButtonContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet1 = {
  userId: 1,
  styles: {},
  followList: [2, 3],
  updateFollowList: jest.fn(),
  fetchFollowList: jest.fn(),
  loading: [1],
  children: jest.fn(),
  openLoginModal: jest.fn()
};

const storeState = {
  followList: {
    followList: [],
    ongoingfetchOperations: [1]
  },
  login: {
    isAuthenticated: true
  }
};

const propSet2Loading = {
  userId: 2,
  styles: {},
  followList: [1, 2, 3],
  updateFollowList: jest.fn(),
  fetchFollowList: jest.fn(),
  loading: [2],
  children: jest.fn(),
  isAuthenticated: true,
  openLoginModal: jest.fn()
};

const propSet2NotLoading = {
  ...propSet2Loading,
  loading: []
};

it('should render without crashing', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should update follow list when user follows or unfollows another user', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet2Loading} />);
  wrapper.instance().onClickHandler();
  expect(propSet2Loading.updateFollowList).toHaveBeenCalledWith(2, wrapper.state('following'));
  wrapper.setProps({ followList: [] });
  expect(wrapper.state('loading')).toBe(true);
  wrapper.setProps(propSet2NotLoading);
  expect(wrapper.state('loading')).toBe(false);
});

it('should derive state from props when props change', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet2NotLoading} />);
  expect(wrapper.state('text')).toBe('Unfollow');
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedFollowButtonContainer {...propSet2NotLoading} store={store} />);
  expect(wrapper.prop('followList')).toHaveLength(0);
});
