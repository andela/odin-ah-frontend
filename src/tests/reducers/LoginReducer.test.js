import * as types from '../../redux/constants';
import login from '../../redux/reducer/login';

const initialState = {
  isAuthenticated: false,
  user: {}
};
describe('Login Reducer', () => {
  it('it should log in a User', () => {
    const user = {
      id: 1,
      email: ''
    };
    const action = {
      type: types.LOGIN_USER,
      user
    };
    const newState = login(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ user, isAuthenticated: true }
    });
  });
  it('it should not log in a User', () => {
    const user = {
      id: 1,
      email: ''
    };
    const action = {
      type: types.LOGIN_USER_ERROR,
      user
    };
    const newState = login(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ isAuthenticated: false }
    });
  });
  it('it should load when logging in', () => {
    const action = {
      type: types.AUTHENTICATING,
    };
    const newState = login(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      loading: action.loading
    });
  });
  it('it should log out in a User', () => {
    const action = {
      type: types.LOGOUT_USER,
    };
    const newState = login(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ isAuthenticated: false },
      user: null
    });
  });
});
