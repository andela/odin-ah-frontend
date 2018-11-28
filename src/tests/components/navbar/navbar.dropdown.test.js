import { mount } from 'enzyme/build';
import React from 'react';
import NavBarDropDown from '../../../components/navbar/NavBarDropDown';

const eventMap = {};
window.addEventListener = jest.fn((event, cb) => {
  eventMap[event] = cb;
});

describe('Search Drop Down', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    jest.useFakeTimers();
    props = {
      show: true,
      onClose: jest.fn(),
      display: '<div>Test</div>',
      menuBody: '<div>Test</div>',
    };
    wrapper = mount(<NavBarDropDown {...props}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('simulate componentWillReceiveProps', () => {
    const instance = wrapper.instance();
    const toggleSpy = jest.spyOn(instance, 'onToggleClick');
    props.show = false;
    wrapper.setProps(props);
    expect(toggleSpy).toBeCalledWith(props.show);
  });
  test('should not dismiss dropdown when an element within the dropdown menu is clicked', () => {
    const instance = wrapper.instance();
    instance.onToggleClick(true);
    instance.forceUpdate();
    const target = wrapper.find('.dropdown-menu')
      .getDOMNode();
    eventMap.click({ target });
    expect(props.onClose).not.toBeCalled();
  });
  test('should dismiss dropdown when an element outside the dropdown menu is clicked', () => {
    const instance = wrapper.instance();
    instance.onToggleClick(true);
    instance.forceUpdate();
    eventMap.click({ target: document });
    expect(props.onClose).toBeCalled();
  });
});
