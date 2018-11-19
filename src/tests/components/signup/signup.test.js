import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import faker from 'faker';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { SignUp } from '../../../components/signup/index';
import PresentationComponent, { Presentation } from '../../../components/signup/presentation';
import apiRequest from '../../../services/apiRequest';
import userValidator from '../../../validators/UserValidator';
import { registrationResult } from '../../actions/auth.test';
import generateEvent from '../../utils';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = {
  username: 'dummyUser',
  email: faker.internet.email(),
  password: faker.internet.password()
};

test('should not submit the form when provided with invalid input', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'post')
    .resolves(registrationResult);
  const mockOnSubmitFunc = jest.fn();
  const wrapper = shallow(
    <Presentation
      onSubmit={mockOnSubmitFunc}/>
  );
  wrapper.setState({ errors: {} });
  wrapper.find('#signupForm')
    .simulate(
      'submit', {
        preventDefault() {
        }
      }
    );
  wrapper.update();
  expect(mockOnSubmitFunc)
    .not
    .toBeCalled();
  expect(mockOnSubmitFunc.mock.calls.length)
    .toBe(0);
  apiReqStub.restore();
});

test('should submit the form when provided with a valid input', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'post')
    .resolves(registrationResult);
  const mockOnSubmitFunc = jest.fn();
  const wrapper = shallow(
    <Presentation onSubmit={mockOnSubmitFunc}/>
  );

  wrapper.setState({
    email: user.email,
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
  });
  wrapper.update();
  wrapper.find('#signupForm')
    .simulate(
      'submit', {
        preventDefault() {
        }
      }
    );
  expect(mockOnSubmitFunc)
    .toBeCalled();
  expect(mockOnSubmitFunc.mock.calls.length)
    .toBe(1);
  apiReqStub.restore();
});

test('should trigger field validator', async () => {
  const mockRegisterUser = jest.fn();
  const wrapper = shallow(<Presentation onSubmit={mockRegisterUser}/>);

  const invalidHandlerSpy = jest.spyOn(wrapper.instance(), 'validateInput');
  const validateFieldSpy = jest.spyOn(userValidator, 'validateField');

  wrapper.setState({
    email: user.email,
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
  });
  const onChangeEvent = generateEvent('confirmPassword', user.username);
  wrapper.instance()
    .validateInput(onChangeEvent);

  expect(invalidHandlerSpy)
    .toBeCalled();
  expect(invalidHandlerSpy.mock.calls.length)
    .toBe(1);
  expect(validateFieldSpy.mock.calls.length)
    .toBe(1);
  validateFieldSpy.mockRestore();
});

test('should not trigger field validator when input is empty', async () => {
  const mockRegisterUser = jest.fn();
  const wrapper = shallow(<Presentation onSubmit={mockRegisterUser}/>);

  const invalidHandlerSpy = jest.spyOn(wrapper.instance(), 'validateInput');
  const validateFieldSpy = jest.spyOn(userValidator, 'validateField');

  wrapper.setState({
    email: user.email,
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
  });
  const onChangeEvent = generateEvent('username', '');
  wrapper.instance()
    .validateInput(onChangeEvent);

  expect(invalidHandlerSpy)
    .toBeCalled();
  expect(invalidHandlerSpy.mock.calls.length)
    .toBe(1);
  expect(validateFieldSpy.mock.calls.length)
    .toBe(0);
  validateFieldSpy.mockRestore();
});

test('should trigger stateUpdate function', async () => {
  const mockRegisterUser = jest.fn();
  const wrapper = shallow(<Presentation onSubmit={mockRegisterUser}/>);
  const instance = wrapper.instance();
  const updateStateSpy = jest.spyOn(instance, 'updateState');
  const errors = { email: ['Dummy error'] };
  wrapper.setState({
    email: user.email,
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
    errors
  });
  const update = {
    email: faker.internet.email(),
  };
  instance.forceUpdate();
  instance.updateState(update);
  errors.email = null;
  expect(wrapper.state('email'))
    .toEqual(update.email);
  expect(wrapper.state('errors'))
    .toEqual(errors);
  expect(updateStateSpy)
    .toBeCalled();
  expect(updateStateSpy.mock.calls.length)
    .toBe(1);
  updateStateSpy.mockRestore();
});

test('should renders SignUp component without crashing', async () => {
  const mockOnSubmitFunc = jest.fn();
  const store = mockStore({
    registration: { loading: true, },
  });
  const wrapper = mount(<PresentationComponent onSubmit={mockOnSubmitFunc} store={store}/>);
  wrapper.setState({ result: { data: {} } });
});

test('should renders SignUp component without crashing', async () => {
  const mockRegisterUserFunc = jest.fn();
  shallow(<SignUp registerUser={mockRegisterUserFunc}/>);
});
