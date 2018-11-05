import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
} from '../constants/index';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
  redirect: false
};

// let newState;

export default (state = initialState, action = {}) => {
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
        error: action.error
      };
    default: return state;
  }
};
