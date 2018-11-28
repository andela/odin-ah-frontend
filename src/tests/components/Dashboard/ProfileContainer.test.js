import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedProfileContainer, { ProfileContainer } from '../../../components/profile/ProfileContainer';
import { mockStoreData } from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const propSet = {
  modified: !true,
  profiledata: mockStoreData.profiledata.data,
  isLoading: true,
};

const props = {
  uploadProfileData: jest.fn(() => Promise.resolve()),
  profiledata: mockStoreData.profiledata,
  profileData: jest.fn(() => Promise.resolve()),
};

const dummyEventData = {
  target: {
    name: 'email',
    value: 'victor@gmail.com'
  }
};
const dummyEventDataSettings = {
  target: {
    name: 'articleComment',
  }
};
const props2 = {
  uploadProfileData: jest.fn(() => Promise.resolve()),
  location: { pathname: '/dashbord' },
  match: { path: '/dashboard', url: '/dashboard' }
};

const props3 = {
  uploadProfileData: jest.fn(() => Promise.resolve()),
};

it('should render ProfileContainer', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  expect(wrapper.exists()).toBe(true);
});

it('should change state when component mounts', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  wrapper.instance().componentDidMount();
  expect(wrapper.prop('setState')).toHaveBeenCalled;
});

it('should call setState when  handleProfileUpdate event occur', () => {
  const wrapper = shallow(<ProfileContainer {...props3} profiledata={ props.profiledata } />);
  wrapper.instance().handleProfileUpdate();
  expect(wrapper.prop('setState')).toHaveBeenCalled;
  expect(wrapper.prop('uploadProfileData')).toHaveBeenCalled;
});

it('should call setState when handleToggleCheckBox  is called ', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  wrapper.instance().handleToggleCheckBox(dummyEventDataSettings);
  expect(wrapper.prop('setState')).toHaveBeenCalled;
});

it('should call setState when  component recive new props ', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  wrapper.instance().UNSAFE_componentWillReceiveProps(propSet);
  expect(wrapper.prop('setState')).toHaveBeenCalled;
});

it('should call input event ', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  wrapper.instance().handleInputOnChange(dummyEventData);
  expect(wrapper.prop('setState')).toHaveBeenCalled;
});

it('should call setState when  fileSelectedHandler  event occur', () => {
  const wrapper = shallow(<ProfileContainer {...props2} profiledata={ props.profiledata } />);
  wrapper.instance().fileSelectedHandler();
  expect(wrapper.prop('setState')).toHaveBeenCalled;
  expect(wrapper.prop('uploadImageToCloud')).toHaveBeenCalled;
});

it('should synchronise with app state in the store', () => {
  const store = mockStore({ ...mockStoreData });
  const wrapper = mount(<ConnectedProfileContainer{...propSet} store={store} />);
  expect(wrapper.prop('modified')).toBe(false);
});
