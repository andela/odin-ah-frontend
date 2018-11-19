import { shallow } from 'enzyme';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import LoginModals, { LoginModal } from '../../components/modal/content/LoginModalContent';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('LoginView Component', () => {
  test('should ', () => {
    const onSubmit = jest.fn();
    shallow(<LoginModal
      dismissModal={jest.fn()} userLoginRequest={jest.fn()}
      isAuthenticated={false}
      referrer={{ from: 'url' }} loading={false} onSubmit={onSubmit}/>);
  });
  test('should ', () => {
    const onSubmit = jest.fn();
    shallow(<LoginModal
      dismissModal={jest.fn()} userLoginRequest={jest.fn()}
      isAuthenticated={true}
      referrer={{ from: 'url' }} loading={false} onSubmit={onSubmit}/>);
  });
  test('should ', () => {
    const store = mockStore({
      login: {
        isAuthenticated: true,
        loading: false
      },
      redirect: { referrer: { from: 'url' } }
    });
    const onSubmit = jest.fn();
    shallow(<LoginModals
      store={store}
      dismissModal={jest.fn()} userLoginRequest={jest.fn()}
      isAuthenticated={true}
      referrer={{ from: 'url' }} loading={false} onSubmit={onSubmit}/>);
  });
});
