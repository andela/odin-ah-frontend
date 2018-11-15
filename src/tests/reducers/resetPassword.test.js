import * as types from '../../redux/constants/resetPassword';
import resetPasswordReducer from '../../redux/reducer/passwordReset';

describe('INITIAL_STATE', () => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    token: ''
  };
  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });
  it('should handles SAVE_INPUT', () => {
    const action = {
      type: types.SAVE_INPUT,
      payload: { field: 'email', value: 'hboy@gmail.com' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: 'hboy@gmail.com',
      password: '',
      confirmPassword: '',
      token: ''
    });
  });
  it('should handles PASSWORD_RESET_REQUEST', () => {
    const action = {
      type: types.PASSWORD_RESET_REQUEST,
      payload: { field: 'email', value: 'hboy@gmail.com' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      resetLoading: true,
      token: ''
    });
  });
  it('should handles PASSWORD_RESET_REQUEST_FAILURE', () => {
    const action = {
      type: types.PASSWORD_RESET_REQUEST_FAILURE,
      payload: { field: 'email', value: 'hboy@gmail.com' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      resetLoading: false,
    });
  });
  it('should handles PASSWORD_RESET_REQUEST_SUCCESS', () => {
    const action = {
      type: types.PASSWORD_RESET_REQUEST_SUCCESS,
      payload: { field: 'email', value: 'hboy@gmail.com' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      resetLoading: false,
    });
  });
  it('should handles COMPLETE_RESET_REQUEST', () => {
    const action = {
      type: types.COMPLETE_RESET_REQUEST,
      payload: { field: 'password', value: '12345678' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      confirming: true
    });
  });
  it('should handles COMPLETE_RESET_REQUEST_FAILURE', () => {
    const action = {
      type: types.COMPLETE_RESET_REQUEST_FAILURE,
      payload: { field: 'password', value: '12345678' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      confirming: false
    });
  });
  it('should handles COMPLETE_RESET_REQUEST_SUCCESS', () => {
    const action = {
      type: types.COMPLETE_RESET_REQUEST_SUCCESS,
      payload: { field: 'password', value: '12345678' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      confirming: false
    });
  });
  it('should handles INPUT_ERROR', () => {
    const action = {
      type: types.INPUT_ERROR,
      payload: { field: 'password', value: '12345678' }
    };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      email: '',
      confirmPassword: '',
      token: '',
      password: '',
      field: 'password',
      value: '12345678'
    });
  });
});
