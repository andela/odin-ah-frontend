import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ResetPasswordForm } from '../../components/passwordReset/ResetPasswordForm';

const passwordResetData = {
  password: '',
  confirmPassword: '',
  message: '',
  confirming: true,
  errors: ''
};
const match = { params: { token: '' } };


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders ResetPasswordForm component without crashing', () => {
  const wrapper = shallow(
    <ResetPasswordForm
      passwordResetData={passwordResetData}
      completeResetRequest={() => jest.fn()}
      saveInputHandler={() => jest.fn()}
      match={match}
    />
  );
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'password' },
  });
  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'password' },
  });
  const form = wrapper.find('form');
  form.simulate('submit', {
    preventDefault: jest.fn()
  });
  expect(wrapper).toMatchSnapshot();
});

test('renders ResetPasswordForm component without crashing', () => {
  passwordResetData.message = 'Success Message';
  const wrapper = shallow(
    <ResetPasswordForm
      passwordResetData={passwordResetData}
      completeResetRequest={() => jest.fn()}
      saveInputHandler={() => jest.fn()}
      match={match}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('renders ResetPasswordForm component without crashing', () => {
  passwordResetData.errors = { password: '', confirmPassword: '' };
  passwordResetData.message = '';
  const wrapper = shallow(
    <ResetPasswordForm
      passwordResetData={passwordResetData}
      completeResetRequest={() => jest.fn()}
      saveInputHandler={() => jest.fn()}
      match={match}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('renders ResetPasswordForm component without crashing', () => {
  const store = mockStore({ passwordResetData });
  shallow(
    <ResetPasswordForm
      store={store}
      passwordResetData={passwordResetData}
      completeResetRequest={() => jest.fn()}
      saveInputHandler={() => jest.fn()}
      match={match}
    />
  );
});
