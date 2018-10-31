import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import faker from 'faker';
import { SignUp } from '../../../components/signup/index';
import { Presentation } from '../../../components/signup/presentation';
import apiRequest from '../../../services/apiRequest';
import userValidator from '../../../validators/UserValidator';
import { registrationResult } from '../../actions/auth.test';

const user = {
  username: 'dummyUser',
  email: faker.internet.email(),
  password: faker.internet.password()
};

function generateEvent(name, value, option = {}) {
  return {
    target: {
      value,
      name,
      ...option
    }
  };
}

test('should not submit the form when provided with invalid input', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'post')
    .resolves(registrationResult);
  const mockRegisterUserfunc = jest.fn();
  const mockAlertFunc = jest.fn();
  const wrapper = shallow(<Presentation showAlert={mockAlertFunc}
                                        onSubmit={mockRegisterUserfunc}/>);
  const emailEvent = generateEvent('email', user.email);
  const usernameEvent = generateEvent('username', user.username);
  const passwordEvent = generateEvent('password', user.password);
  const confirmPasswordEvent = generateEvent('confirmPassword', 'notAMatch');
  wrapper.find('#email')
    .simulate('change', emailEvent);
  wrapper.find('#username')
    .simulate('change', usernameEvent);
  wrapper.find('#password')
    .simulate('change', passwordEvent);
  wrapper.find('#confirmPassword')
    .simulate('change', confirmPasswordEvent);
  wrapper.find('#signupForm')
    .simulate(
      'submit', {
        preventDefault() {
        }
      }
    );
  wrapper.update();
  expect(mockRegisterUserfunc)
    .not
    .toBeCalled();
  expect(mockRegisterUserfunc.mock.calls.length)
    .toBe(0);
  expect(mockAlertFunc.mock.calls.length)
    .toBe(1);
  apiReqStub.restore();
});

test('should submit the form when provided with a valid input', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'post')
    .resolves(registrationResult);
  const mockRegisterUserfunc = jest.fn();
  const mockAlertFunc = jest.fn();
  const wrapper = shallow(<Presentation showAlert={mockAlertFunc}
                                        onSubmit={mockRegisterUserfunc}/>);
  const emailEvent = generateEvent('email', user.email);
  const usernameEvent = generateEvent('username', user.username);
  const passwordEvent = generateEvent('password', user.password);
  const confirmPasswordEvent = generateEvent('confirmPassword', user.password);
  wrapper.find('#email')
    .simulate('change', emailEvent);
  wrapper.find('#username')
    .simulate('change', usernameEvent);
  wrapper.find('#password')
    .simulate('change', passwordEvent);
  wrapper.find('#confirmPassword')
    .simulate('change', confirmPasswordEvent);
  wrapper.find('#signupForm')
    .simulate(
      'submit', {
        preventDefault() {
        }
      }
    );
  wrapper.update();
  expect(mockRegisterUserfunc)
    .toBeCalled();
  expect(mockRegisterUserfunc.mock.calls.length)
    .toBe(1);
  expect(mockAlertFunc.mock.calls.length)
    .toBe(0);
  apiReqStub.restore();
});

test('should trigger field validator', async () => {
  const mockRegisterUser = jest.fn();
  const mockAlertFunc = jest.fn();
  const wrap = shallow(<Presentation showAlert={mockAlertFunc}
                                     onSubmit={mockRegisterUser}/>);

  const invalidHandlerSpy = jest.spyOn(wrap.instance(), 'validateInput');
  const validateFieldSpy = jest.spyOn(userValidator, 'validateField');

  wrap.instance()
    .forceUpdate();

  const invalidUsernameEvent = generateEvent('username', 'invalid username');
  const invalidEmailEvent = generateEvent('email', 'invalid username');
  const validEmailEvent = generateEvent('email', '');
  const invalidPasswordEvent = generateEvent('password', 'wait');
  const invalidConfirmPasswordEvent = generateEvent('confirmPassword', 'wait');

  wrap.find('#email')
    .simulate('blur', validEmailEvent);
  wrap.find('#username')
    .simulate('blur', invalidUsernameEvent);
  wrap.find('#email')
    .simulate('blur', invalidEmailEvent);
  wrap.find('#password')
    .simulate('blur', invalidPasswordEvent);
  wrap.find('#confirmPassword')
    .simulate('blur', invalidConfirmPasswordEvent);

  expect(invalidHandlerSpy)
    .toBeCalled();
  expect(invalidHandlerSpy.mock.calls.length)
    .toBe(5);
  expect(validateFieldSpy.mock.calls.length)
    .toBe(4);
});

test('should trigger stateUpdate function', async () => {
  const mockRegisterUser = jest.fn();
  const mockAlertFunc = jest.fn();
  const wrap = shallow(<Presentation showAlert={mockAlertFunc}
                                     onSubmit={mockRegisterUser}/>);
  const updateStateSpy = jest.spyOn(wrap.instance(), 'updateState');

  wrap.instance()
    .forceUpdate();

  const onChangeEvent = generateEvent('username', user.username);
  wrap.find('#username')
    .simulate('change', onChangeEvent);

  expect(updateStateSpy)
    .toBeCalled();
  expect(updateStateSpy.mock.calls.length)
    .toBe(1);
});

test('should renders SignUp component without crashing', async () => {
  const mockRegisterUserfunc = jest.fn();
  shallow(<SignUp registerUser={mockRegisterUserfunc}/>);
});
