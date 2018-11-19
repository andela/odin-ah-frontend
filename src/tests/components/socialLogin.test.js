import React from 'react';
import { shallow } from 'enzyme';
import { SocialLogin } from '../../components/login/SocialLogin';

describe('SocialLogin', () => {
  test('should not render when user info has not been retrieved', () => {
    const location = {
      search: '?token=eghgezrtdyfugfudsetrdyutfiyguihvctydr5678r7t8uhbvkcjytxyrest5y46r7t8oyhiuvcyutdre756r87t98ygifghjhjghfgdsrtdfytdysdyrtf0'
    };
    const getAuthUserProfile = jest.fn();
    const wrapper = shallow(
    <SocialLogin location={location} getAuthUserProfile={getAuthUserProfile} error={{ message: 'Some error' }} />
    );
    expect(wrapper.exists()).toBe(true);
  });
  test('should render homepage when user info has been retrieved', () => {
    const location = {
      search: '?token=etryertuerwqrtyut45676546789787654345tyufhgdfdsafsgdhfjghjphog8f75r6tfg7y8hou9pijomnkjsrtdgfhgjkuytureetrytuyiutyretrytg'
    };
    const getAuthUserProfile = jest.fn();
    const wrapper = shallow(
    <SocialLogin location={location} getAuthUserProfile={getAuthUserProfile} user={{}} error={{ message: 'Some error' }} />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
