import React from 'react';
import { mount } from 'enzyme';
import { LoginModal } from '../../components/login/LoginModal';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    userLoginRequest: jest.fn(() => Promise.resolve()),
    show: false,
    close: jest.fn(() => Promise.resolve())
  };

  const wrapper = mount(<LoginModal loading={false} {...props} />);

  return {
    props,
    wrapper
  };
};

describe('Login modal component', () => {
  const { props, wrapper } = setup();
  describe('Validate your input when form is submitted', () => {
    it('should throw an error when no data is provided', () => {
      const event = {
        preventDefault: jest.fn()
      };
      wrapper.instance().onSubmit(event);
      expect(wrapper.state().errors).toEqual({
        password: 'This field is required',
        email: 'This field is required'
      });
    });

    it('should throw error when email or password is invalid', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      wrapper.setState({ email: 'tes', password: 'pass' });
      wrapper.instance().onSubmit(event);
      expect(wrapper.state().errors).toEqual({
        password: 'Your password must not be lass than 8 characters',
        email: 'Your email is invalid'
      });
    });
    it('should setState when form is submitted', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          name: 'email',
          value: 'test@mail.com'
        }
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().email).toEqual('test@mail.com');
    });
    it('should call userLoginRequest action when form is submitted', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      wrapper.setState({ email: 'test@mail.com', password: 'password123' });
      wrapper.instance().onSubmit(event);
      expect(props.userLoginRequest.mock.calls.length).toEqual(1);
    });
  });
});
