import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordForm } from '../../components/passwordReset/ResetPasswordForm';

test('renders ResetPasswordForm component without crashing', () => {
  const passwordResetData = {
    password: '',
    confirmPassword: '',
    message: '',
    confirming: true,
    errors: ''
  };
  const match = { params: { token: '' } };

  const wrapper = shallow(
    <ResetPasswordForm
      passwordResetData={passwordResetData}
      resetRequestHandler={() => jest.fn()}
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
