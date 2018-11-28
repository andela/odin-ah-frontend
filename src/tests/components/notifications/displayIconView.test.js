import React from 'react';
import { shallow } from 'enzyme';
import DisplayIconView from '../../../components/inAppNotification/notification/displayIconView';

describe('displayIconView', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DisplayIconView />);
    expect(wrapper.exists()).toBe(true);
  });
});
