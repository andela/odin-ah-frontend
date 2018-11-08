import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import faker from 'faker';
import VerifyEmailComponent, { VerifyEmail } from '../../../components/signup/verifyEmail';
import ReVerificationForm from '../../../components/signup/reVerificationForm';
import apiRequest from '../../../services/apiRequest';
import ReVerifyEmailComponent, { ReVerifyEmail } from '../../../components/signup/reverifyEmail';
import userValidator from '../../../validators/UserValidator';
import generateEvent from '../../utils';
import { registrationResult } from '../../actions/auth.test';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const match = { params: { token: '' } };

describe('Verify Link Component', () => {
  test('should render without crash', async () => {
    const mockResendVerificationFunc = jest.fn();
    shallow(
      <VerifyEmail
        resendVerificationLink={mockResendVerificationFunc}
        match={match} verifyToken={mockResendVerificationFunc}/>
    );
  });

  test('should render with Redux included without crash', async () => {
    const mockResendVerificationFunc = jest.fn();
    const store = mockStore({
      verify: { verifying: true, },
      match
    });
    shallow(<VerifyEmailComponent
      store={store}
      resendVerificationLink={mockResendVerificationFunc}
      match={match} verifyToken={mockResendVerificationFunc}/>);
  });
});

describe('Re-Verify Email Component', () => {
  test('should render without crash', async () => {
    const mockOnSubmitFunc = jest.fn();
    shallow(<ReVerifyEmail loading={false} resendVerificationLink={mockOnSubmitFunc}/>);
  });
  test('should render with Redux included without crash', () => {
    const store = mockStore({
      verify: { loading: true },
    });
    shallow(<ReVerifyEmailComponent store={store}/>);
  });
});

// Email re-verification form
describe('Email re-verification form', () => {
  test('should submit the form when provided with invalid input', async () => {
    const mockOnSubmitFunc = jest.fn();
    const wrapper = shallow(
      <ReVerificationForm
        loading={false}
        onSubmit={mockOnSubmitFunc}/>
    );

    const email = faker.internet.email();
    wrapper.setState({
      email,
    });
    wrapper.update();
    wrapper.find('#resendLinkForm')
      .simulate(
        'submit', {
          preventDefault() {
          }
        }
      );

    expect(mockOnSubmitFunc.mock.calls.length)
      .toBe(1);
  });
  test('should not submit the form when provided with invalid input', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .resolves(registrationResult);
    const mockOnSubmitFunc = jest.fn();
    const wrapper = shallow(
      <ReVerificationForm loading={false}
                          onSubmit={mockOnSubmitFunc}/>
    );
    wrapper.setState({ errors: { email: [''] } });
    wrapper.find('#resendLinkForm')
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
  test('should trigger field validator', async () => {
    const mockRegisterUser = jest.fn();
    const wrapper = shallow(<ReVerificationForm loading={false} onSubmit={mockRegisterUser}/>);

    const invalidHandlerSpy = jest.spyOn(wrapper.instance(), 'validateInput');
    const validateFieldSpy = jest.spyOn(userValidator, 'validateField');

    const email = faker.internet.email();
    wrapper.setState({
      email,
    });
    const onChangeEvent = generateEvent(email, 'email');
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
    const wrapper = shallow(<ReVerificationForm onSubmit={mockRegisterUser} loading={false}/>);

    const invalidHandlerSpy = jest.spyOn(wrapper.instance(), 'validateInput');
    const validateFieldSpy = jest.spyOn(userValidator, 'validateField');

    const email = faker.internet.email();
    wrapper.setState({
      email,
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
    const wrapper = shallow(<ReVerificationForm onSubmit={mockRegisterUser} loading={false}/>);
    const instance = wrapper.instance();
    const updateStateSpy = jest.spyOn(instance, 'updateState');
    const error = { email: ['Dummy error'] };
    const email = faker.internet.email();
    wrapper.setState({
      email,
      error
    });
    const update = {
      email: faker.internet.email(),
    };
    instance.forceUpdate();
    instance.updateState(update);
    error.email = null;
    expect(wrapper.state('email'))
      .toEqual(update.email);
    expect(wrapper.state('error'))
      .toEqual(error);
    expect(updateStateSpy)
      .toBeCalled();
    expect(updateStateSpy.mock.calls.length)
      .toBe(1);
    updateStateSpy.mockRestore();
  });
});
