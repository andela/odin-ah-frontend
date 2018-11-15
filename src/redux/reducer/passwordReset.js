import {
  SAVE_INPUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_FAILURE,
  COMPLETE_RESET_REQUEST,
  COMPLETE_RESET_REQUEST_SUCCESS,
  COMPLETE_RESET_REQUEST_FAILURE,
  INPUT_ERROR
} from '../constants/resetPassword';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  token: ''
};

const passwordResetReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    // eslint-disable-no-case-declarations
    case SAVE_INPUT: {
      const { field, value } = action.payload;
      newState[field] = value;
      return newState;
    }
    case PASSWORD_RESET_REQUEST:
      newState = { ...state };
      newState.resetLoading = true;
      newState.email = '';
      return newState;
    case PASSWORD_RESET_REQUEST_SUCCESS:
      newState = { ...state };
      newState.resetLoading = false;
      newState.message = action.payload.message;
      return newState;
    case PASSWORD_RESET_REQUEST_FAILURE:
      newState = { ...state };
      newState.resetLoading = false;
      newState.message = action.payload.message;
      return newState;
    case COMPLETE_RESET_REQUEST:
      newState = { ...state };
      newState.confirming = true;
      newState.password = '';
      newState.confirmPassword = '';
      return newState;
    case COMPLETE_RESET_REQUEST_SUCCESS:
      newState = { ...state };
      newState.confirming = false;
      newState.message = action.payload.message;
      return newState;
    case COMPLETE_RESET_REQUEST_FAILURE:
      newState = { ...state };
      newState.message = action.payload.message;
      newState.confirming = false;
      return newState;
    case INPUT_ERROR:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default passwordResetReducer;
