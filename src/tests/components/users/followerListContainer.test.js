import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import ConnectedFollowerListContainer, {
  FollowerListContainer
} from '../../../components/users/FollowerListContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet1 = {
  limit: 15,
  currentPage: 1,
  tootalPages: 1,
  total: 2,
  fetchFollowerList: jest.fn(),
  loading: false,
  followerList: [{ userId: 1 }],
  children: jest.fn()
};

const storeState = {
  followerList: {
    followerList: [],
    currentPage: 1,
    totalPages: 1,
    total: 1,
    loading: false
  }
};

it('should render without crashing', () => {
  const wrapper = shallow(<FollowerListContainer {...propSet1} />);
  expect(wrapper.exists()).toBe(true);
});

it('should handle the fetching of a new page', () => {
  const wrapper = shallow(<FollowerListContainer {...propSet1} />);
  wrapper.instance().handlePageFetch(1, 2);
  expect(propSet1.fetchFollowerList).toHaveBeenCalledWith(1, 2);
});

it('should handle the fetching of a new page', () => {
  const wrapper = shallow(<FollowerListContainer {...propSet1} />);
  wrapper.instance().handlePageFetch(1);
  expect(propSet1.fetchFollowerList).toHaveBeenCalledWith(1, 15);
});

it('should synchronise with app state in the store', () => {
  const store = mockStore(storeState);
  const wrapper = shallow(<ConnectedFollowerListContainer {...propSet1} store={store} />);
  expect(wrapper.prop('followerList')).toHaveLength(0);
});
