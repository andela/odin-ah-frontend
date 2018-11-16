import React from 'react';
import { shallow } from 'enzyme';
import ProfileImageUpload from '../../components/profileImageUpload/ProfileImageUpload';


const imageUrl = {
  imageUrl: 'http://res.cloudinary.com/dk2ot4wij/image/upload/v1542190066/begpik8z7yybst9tlbz1.jpg',
};

const eventHandler = {
  fileSelectedHandler: jest.fn(() => Promise.resolve()),
};

it('renders without crashing', () => {
  const wrapper = shallow(<ProfileImageUpload handleEvent={ eventHandler } { ...imageUrl }/>);
  expect(wrapper.exists()).toBe(true);
});
