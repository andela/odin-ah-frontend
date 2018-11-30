import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedDashboardContainer, {
  DashboardContainer
} from '../../../components/dashboard/DashboardContainer';
import { mockStoreData } from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet = {
  isProfileActive: true,
  isStatisticsActive: false
};
const props = {
  profiledata: mockStoreData.profiledata,
  profileData: jest.fn(() => Promise.resolve())
};
it('should render DashboardContainer', () => {
  const wrapper = shallow(<DashboardContainer {...props} />);
  expect(wrapper.exists()).toBe(true);
});

it('should call profile data when component mounts', () => {
  const wrapper = shallow(<DashboardContainer {...props} />);
  wrapper.instance().componentDidMount();
  expect(wrapper.prop('profileData')).toHaveBeenCalled;
});

it('should synchronise with app state in the store', () => {
  const store = mockStore({ ...mockStoreData });
  const wrapper = shallow(<ConnectedDashboardContainer {...propSet} store={store} />);
  expect(wrapper.prop('isProfileActive')).toBe(true);
});
