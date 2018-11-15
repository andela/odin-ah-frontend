import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { SocialLogin } from '../../components/login/SocialLogin';
import PageLoader from '../../components/PageLoader';

describe.only('SocialLogin', () => {
  test('should render pageloader when user info has not been retrieved', () => {
    const location = {
      search: '?token=eghgezrtdyfugfudsetrdyutfiyguihvctydr5678r7t8uhbvkcjytxyrest5y46r7t8oyhiuvcyutdre756r87t98ygifghjhjghfgdsrtdfytdysdyrtf0'
    };
    const getAuthUserProfile = jest.fn();
    const wrapper = shallow(
    <SocialLogin location={location} getAuthUserProfile={getAuthUserProfile} />
    );
    expect(wrapper.find(PageLoader)).toHaveLength(1);
  });
  test('should redirect to homepage when user info has been retrieved', () => {
    const location = {
      search: '?token=etryertuerwqrtyut45676546789787654345tyufhgdfdsafsgdhfjghjphog8f75r6tfg7y8hou9pijomnkjsrtdgfhgjkuytureetrytuyiutyretrytg'
    };
    const getAuthUserProfile = jest.fn();
    const wrapper = shallow(
    <SocialLogin location={location} getAuthUserProfile={getAuthUserProfile} user={{}} />
    );
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
