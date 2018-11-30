import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ConnectedFollowingListContainer, {
  FollowingListContainer
} from '../../../components/users/FollowingListContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet1 = {
  limit: 15,
  currentPage: 1,
  totalPages: 1,
  total: 2,
  fetchFollowList: jest.fn(),
  loading: false,
  followList: [{ userId: 1 }],
  children: jest.fn(),
  sync: true
};

const propSet2 = {
  ...propSet1,
  sync: false
};

const storeState = {
  followList: {
    followList: [],
    currentPage: 1,
    totalPages: 1,
    total: 1,
    loading: false,
    storeIsSynced: true
  }
};

it('should render without crashing', () => {
  const wrapper = shallow(<FollowingListContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should handle the fetching of a new page', () => {
  const wrapper = shallow(<FollowingListContainer {...propSet1} />);
  wrapper.instance().handlePageFetch(1, 2);
  expect(propSet1.fetchFollowList).toHaveBeenCalledWith(1, 2);
});

it('should handle the fetching of a new page', () => {
  const wrapper = shallow(<FollowingListContainer {...propSet1} />);
  wrapper.instance().handlePageFetch(1);
  expect(propSet1.fetchFollowList).toHaveBeenCalledWith(1, 15);
});

it('should handle component update', () => {
  const wrapper = shallow(<FollowingListContainer {...propSet2} />);
  wrapper.instance().componentDidUpdate();
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedFollowingListContainer {...propSet1} store={store} />);
  expect(wrapper.prop('followList')).toHaveLength(0);
});
