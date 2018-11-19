import React from 'react';
import { mount, shallow } from 'enzyme';
import { Notification } from '../../components/notification/index';
import Toasts, { Toast } from '../../components/notification/toast';
import Alerts, { Alert } from '../../components/notification/alert';
import store from '../../redux/store/store';

beforeEach(() => {
  jest.useFakeTimers();
});

test('renders Notification component without crashing', () => {
  const dismissSpy = jest.fn();
  shallow(<Notification show={false} dismiss={dismissSpy} mode={'alert'}/>);
  expect(dismissSpy.mock.calls.length)
    .toBe(0);
});

test('renders Notification component without crashing', () => {
  const dismissSpy = jest.fn();
  const wrapper = shallow(<Notification autoDismiss={false} show={true} dismiss={dismissSpy}
                                        mode={'alert'}/>);
  wrapper.instance()
    .forceUpdate();
  wrapper.find('button')
    .simulate('click');
  expect(dismissSpy)
    .toBeCalled();
  expect(dismissSpy.mock.calls.length)
    .toBe(1);
});

test('renders Notification component without crashing', () => {
  const dismissSpy = jest.fn();
  const wrapper = shallow(<Notification autoDismiss={true} show={true} dismiss={dismissSpy}
                                        mode={'alert'}/>);
  wrapper.instance()
    .forceUpdate();

  wrapper.instance()
    .setTimeout(true);

  expect(dismissSpy)
    .not
    .toBeCalled();

  jest.runAllTimers();

  expect(dismissSpy)
    .toBeCalled();
  expect(dismissSpy)
    .toHaveBeenCalledTimes(1);


  wrapper.instance()
    .setTimeout(true);

  jest.runAllTimers();

  expect(dismissSpy)
    .toBeCalled();
  expect(dismissSpy)
    .toHaveBeenCalledTimes(2);
});

test('renders Notification component without crashing', () => {
  const mockRegisterUserfunc = jest.fn();
  shallow(<Toast mode={'alert'} dismissToast={mockRegisterUserfunc}/>);
});

test('renders Notification component without crashing', () => {
  const mockRegisterUserfunc = jest.fn();
  shallow(<Toasts store={store} mode={'alert'} dismissToast={mockRegisterUserfunc}/>);
});

test('renders Notification component without crashing', () => {
  const mockRegisterUserfunc = jest.fn();
  shallow(<Alert mode={'alert'} dismissAlert={mockRegisterUserfunc}/>);
});

test('renders Alert component with redux store without crashing', () => {
  const mockRegisterUserfunc = jest.fn();
  const wrapper = mount(<Alerts store={store} mode={'alert'} dismissAlert={mockRegisterUserfunc}/>);
  wrapper.unmount();
});
