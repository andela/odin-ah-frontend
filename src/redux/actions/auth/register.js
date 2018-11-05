import apiRequest from '../../../services/apiRequest';
import { alerts, toast } from '../notification';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL';

function dispatchNotification(data, type, dispatch) {
  if (type === 'alert') {
    dispatch(alerts(true, data));
  } else {
    dispatch(toast(true, data));
  }
}

function dispatchError(message, type, dispatch) {
  const data = {
    type: 'error',
    text: message,
  };
  dispatchNotification(data, type, dispatch);
}

function dispatchSuccess(message, type, dispatch) {
  const data = {
    type: 'success',
    text: message,
  };
  dispatchNotification(data, type, dispatch);
}

function getErrorMessage(error) {
  let errMsg;
  let type = 'toast';
  if (error.response) {
    const { data } = error.response;
    type = 'alert';
    errMsg = data.message;
  } else if (error.request) {
    type = 'alert';
    errMsg = 'Unable to process your request at the moment. Please check internet connection';
  } else {
    errMsg = error.message;
  }
  return {
    message: errMsg,
    type
  };
}

export function registrationSuccessful(result) {
  return {
    type: REGISTRATION_SUCCESSFUL,
    result
  };
}

export function registeringUser(loading) {
  return {
    type: REGISTER_USER,
    loading
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    try {
      dispatch(registeringUser(true));
      const result = await apiRequest.createUser(user);
      const { status: statusCode, data } = result;
      dispatchSuccess(data.message, 'alert', dispatch);
      dispatch(registeringUser(false));
      // dispatch(modal(false));
      dispatch(registrationSuccessful({
        statusCode,
        data
      }));
    } catch (error) {
      dispatch(registeringUser(false));
      const { message, type } = getErrorMessage(error);
      dispatchError(message, type, dispatch);
    }
  };
}
