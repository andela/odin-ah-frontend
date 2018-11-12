import {
  AUTHENTICATING,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from '../constants/index';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
  loading: false
};
function login(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error
      };
    case AUTHENTICATING:
      return {
        ...state,
        loading: action.loading
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default: return state;
  }
}
export default login;
