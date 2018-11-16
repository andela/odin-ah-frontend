import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordPage } from '../../components/passwordReset/ResetPasswordPage';

describe('ResetPassword Component', () => {
  it('ResetPasswordPage', () => {
    const passwordResetData = {
      email: '',
      resetRequestStatus: ''
    };
    const wrapper = shallow(
      <ResetPasswordPage
        passwordResetData={passwordResetData}
        resetRequestHandler={() => jest.fn()}
        saveInputHandler={() => jest.fn()}
      />
    );

    wrapper.find('.input')
      .simulate('change', {
        target: { value: 'hello' }
      });
    const form = wrapper.find('form');
    form.simulate('submit', {
      preventDefault: jest.fn(),

    });

    expect(wrapper)
      .toMatchSnapshot();
  });
  it('ResetPasswordPage', () => {
    const passwordResetData = {
      errors: {
        email: '',
      }
    };
    const wrapper = shallow(
      <ResetPasswordPage
        passwordResetData={passwordResetData}
        resetRequestHandler={() => jest.fn()}
        saveInputHandler={() => jest.fn()}
      />
    );

    expect(wrapper)
      .toMatchSnapshot();
  });
});
