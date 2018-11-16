import React from 'react';
import { shallow } from 'enzyme';
import DashboardView from '../../../components/dashboard/DashboardView';

const profiledata = {
  data: {
    bio: 'profile page edit this I want to edithv',
    createdAt: '2018-10-15T17:01:24.917Z',
    email: 'dummy-user@local.host',
    firstName: 'John victor',
    id: 1,
    imageUrl: 'http://res.cloudinary.com/dk2ot4wij/image/upload/v1542190066/begpik8z7yybst9tlbz1.jpg',
    lastName: 'Doe lee',
    settings: {
      articleComment: true,
      articleLike: true,
      emailSubscribe: true,
      newArticleFromUserFollowing: true,
      newFollower: true,
      newFollowerOnSeries: true,
    },
    updatedAt: '2018-11-15T15:00:11.057Z',
    username: 'macphilips',
  }
};
const state = {
  isProfileActive: true,
  isStatisticsActive: false
};
const match = {
  isExact: true,
  params: {},
  path: '/dashboard',
  url: '/dashboard',
};
const eventHandler = {
  handleProfileButton: jest.fn(() => Promise.resolve()),
  handleStatisticsButton: jest.fn(() => Promise.resolve()),
};

it('renders without crashing', () => {
  const wrapper = shallow(<DashboardView
    match={ match }
    profiledata={ profiledata.data }
    { ...state }
    { ...eventHandler } />);
  expect(wrapper.exists()).toBe(true);
});
