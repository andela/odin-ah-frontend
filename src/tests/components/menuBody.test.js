import React from 'react';
import { shallow } from 'enzyme';
import { DropDown } from '../../components/inAppNotification/notification/dropDown';
import MenuBody from '../../components/inAppNotification/notification/menuBody';
import NavBarDropDown from '../../components/inAppNotification/NavBarDropDown';

describe('menuBody', () => {
  it('renders menubody', () => {
    const props = {
      notificationValue: [
        {
          id: 1,
          message: 'Sola Commented on your article',
          isRead: false
        }
      ],
      handleNotificationCheck: jest.fn()
    };
    const wrapper = shallow(<MenuBody {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders NavBarDropDown', () => {
    const props = {
      show: true,
      display: '<p>esrghtrgfd</p>',
      menuHeader: '<p></p>'
    };
    const wrapper = shallow(<NavBarDropDown {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders DropDown', () => {
    const props = {
      getNotification: jest.fn(),
      listenForNotification: jest.fn(),
      notificationValue: [
        {
          id: 1,
          message: 'Sola Commented on your article',
          isRead: false
        }
      ]
    };
    const wrapper = shallow(<DropDown {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should call getNotification on new message from socket', () => {
    const props = {
      getNotification: jest.fn(),
      listenForNotification: jest.fn(),
      notificationValue: [
        {
          id: 1,
          message: 'Sola Commented on your article',
          isRead: false
        }
      ]
    };
    const wrapper = shallow(<DropDown {...props} />);
    wrapper.setProps({
      newMessageFromSocket: true
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('should call handleIconClick', () => {
    const handleIconClickSpy = jest.spyOn(DropDown.prototype, 'handleIconClicked');
    const props = {
      getNotification: jest.fn(),
      listenForNotification: jest.fn(),
      notificationValue: [
        {
          id: 1,
          message: 'Sola Commented on your article',
          isRead: false
        }
      ]
    };
    const wrapper = shallow(<DropDown {...props} />);
    wrapper.setProps({
      newMessageFromSocket: true
    });
    wrapper.instance().handleIconClicked();
    expect(handleIconClickSpy).toHaveBeenCalled();
  });
  it('should call handleNotificationCheck', () => {
    const handleNotificationCheckSpy = jest.spyOn(DropDown.prototype, 'handleNotificationCheck');
    const props = {
      getNotification: jest.fn(),
      listenForNotification: jest.fn(),
      notificationValue: [
        {
          id: 1,
          message: 'Sola Commented on your article',
          isRead: false
        }
      ],
      updateNotification: jest.fn()
    };


    const event = {
      currentTarget: {
        dataset: { id: 1 }
      }
    };
    const wrapper = shallow(<DropDown {...props} />);
    wrapper.setProps({
      newMessageFromSocket: true
    });
    wrapper.instance().handleNotificationCheck(event);
    expect(handleNotificationCheckSpy).toHaveBeenCalled();
  });
});
