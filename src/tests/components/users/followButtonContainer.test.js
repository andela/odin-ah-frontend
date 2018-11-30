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
  updateFollowList: jest.fn(),
  fetchSingleFollow: jest.fn(),
  singleFollowStream: { authorId: 1, error: false, status: true },
  children: jest.fn(),
  openLoginModal: jest.fn(),
  isAuthenticated: true
};

const storeState = {
  followList: {
    singleFollowStream: {}
  },
  login: {
    isAuthenticated: false
  }
};

const propSet2 = {
  userId: 1,
  updateFollowList: jest.fn(),
  fetchSingleFollow: jest.fn(),
  singleFollowStream: { authorId: 1, error: true, status: true },
  children: jest.fn(),
  openLoginModal: jest.fn(),
  isAuthenticated: false
};

it('should render without crashing', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should update follow list when user follows or unfollows another user', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet1} />);
  wrapper.instance().onClickHandler();
  expect(propSet1.updateFollowList).toHaveBeenCalledWith(1, true);
  wrapper.setProps({ isAuthenticated: false });
  wrapper.instance().onClickHandler();
  expect(propSet1.openLoginModal).toHaveBeenCalled();
});

it('should update component when props change', () => {
  const wrapper = shallow(<FollowButtonContainer {...propSet1} />);
  const update1 = wrapper.instance().shouldComponentUpdate(propSet1);
  expect(update1).toBe(true);
  const update2 = wrapper.instance().shouldComponentUpdate(propSet2);
  expect(update2).toBe(false);
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedFollowButtonContainer {...propSet1} store={store} />);
  expect(wrapper.prop('isAuthenticated')).toBe(false);
});
