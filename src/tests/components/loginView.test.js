import { shallow } from 'enzyme';
import React from 'react';
import LoginView from '../../components/login/LoginView';

describe('LoginView Component', () => {
  test('should ', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginView loading={false} onSubmit={onSubmit}/>);
    const instance = wrapper.instance();
    wrapper.find('#loginForm')
      .simulate('submit', {
        preventDefault: jest.fn(),
      });

    instance.updateState({ email: 'localhost@host.com', password: 'password' });
    instance.forceUpdate();

    wrapper.find('#loginForm')
      .simulate('submit', {
        preventDefault: jest.fn(),
      });
    expect(onSubmit).toBeCalled();
  });
});
