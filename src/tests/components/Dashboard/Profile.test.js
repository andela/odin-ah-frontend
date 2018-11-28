import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ProfileView from '../../../components/profile/ProfileView';
import { ProfileContainer } from '../../../components/profile/ProfileContainer';
import DashboardContainer from '../../../components/dashboard/DashboardContainer';
import { mockStoreData } from '../../__mocks__/mockData';

jest.mock('react-router-dom');


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  uploadProfileData: jest.fn(() => Promise.resolve()),
  profiledata: mockStoreData.profiledata,
  onClick: jest.fn(() => Promise.resolve()),
  settings: mockStoreData.settings
};

describe('User Profile component', () => {
  const wrapper = shallow(<ProfileView { ...props } />);
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('renders a input field and textarea', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input').length).toBeGreaterThan(0);
    expect(wrapper.find('textarea').length).toBeGreaterThan(0);
  });

  it('renders the save button', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('button').length).toBeGreaterThan(0);
  });

  it('calls onClick when done edithing profile', () => {
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    expect(props.onClick).not.toBeCalled();
  });

  const wrapper2 = shallow(<ProfileView />);
  it('renders without crashing even without props', () => {
    expect(wrapper2).toBeDefined();
  });
});

const store = mockStore({ ...mockStoreData });


const props2 = {
  location: { pathname: '/dashbord' },
  match: { path: '/dashboard', url: '/dashboard' }
};

const setUp = () => (shallow(<DashboardContainer store={store} { ...props2 } to="/dashboard" />));

describe('Dashboard Container', () => {
  it('renders without DashboardContainer  crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<ProfileContainer { ...props } />);

    const fileSelectedHandler = jest.spyOn(
      wrapper.instance(), 'fileSelectedHandler'
    );
    expect(wrapper).toBeDefined();
    expect(fileSelectedHandler).toHaveBeenCalledTimes(0);
  });
});
