import apiRequest from '../../../services/apiRequest';
import { dispatchError, dispatchSuccess, getErrorMessage } from './register';

export const VERIFICATION = 'VERIFICATION';

export const resendingLink = loading => ({
  type: VERIFICATION,
  loading
});

export const verifyingToken = verifying => ({
  type: VERIFICATION,
  verifying
});

export const verificationComplete = (result, error) => ({
  type: VERIFICATION,
  result,
  error
});


export const verifyToken = token => async (dispatch) => {
  try {
    dispatch(verifyingToken(true));
    const result = await apiRequest.verityConfirmationToken(token);
    dispatch(verifyingToken(false));
    dispatch(verificationComplete(result, null));
  } catch (error) {
    dispatch(verifyingToken(false));

    if (error.response) {
      const { data } = error.response;
      dispatch(verificationComplete(null, data));
    }

    const { message } = getErrorMessage(error);
    dispatchError(message, 'toast', dispatch);
  }
};

export const resendVerificationLink = email => async (dispatch) => {
  try {
    dispatch(resendingLink(true));
    const result = await apiRequest.resendVerificationToken({ email });
    dispatch(resendingLink(false));
    const { data } = result;
    dispatchSuccess(data.message, 'alert', dispatch);
  } catch (error) {
    dispatch(resendingLink(false));
    const { message } = getErrorMessage(error);
    dispatchError(message, 'alert', dispatch);
  }
};
