import React from 'react';
import { shallow } from 'enzyme';
import DisplayIconView from '../../../components/inAppNotification/notification/displayIconView';

describe('displayIconView', () => {
  // const props = {
  //   totalNotification: 3,
  // };
  it('renders without crashing', () => {
    const wrapper = shallow(<DisplayIconView />);
    expect(wrapper.exists()).toBe(true);
  });
});
