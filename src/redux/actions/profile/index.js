import * as actionTypes from '../../constants';
import apiRequest from '../../../services/apiRequest';
import { dispatchError, getErrorMessage, dispatchSuccess } from '../auth/register';

const fetchProfileBegin = () => ({
  type: actionTypes.FETCH_PROFILE_BEGIN,
});

const fetchProfileSuccess = data => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  data,
});

const fetchProfileFailure = error => ({
  type: actionTypes.FETCH_PROFILE_FAILURE,
  error,
});

const saveProfileBegin = () => ({
  type: actionTypes.SAVE_PROFILE_BEGIN,
});

const saveProfileSuccess = data => ({
  type: actionTypes.SAVE_PROFILE_SUCCESS,
  data
});

const saveProfileFailure = error => ({
  type: actionTypes.SAVE_PROFILE_FAILURE,
  error,
});

export const uploadImageToCloud = async (data) => {
  try {
    const response = await apiRequest.uploadImage(data);
    const { url } = await response.json();
    return url;
  } catch (e) {
    return null;
  }
};

export const uploadProfileData = details => async (dispatch) => {
  dispatch(saveProfileBegin());
  try {
    const { data } = await apiRequest.setProfileData(details);
    dispatch(saveProfileSuccess(data));
    dispatchSuccess(data.message, 'alert', dispatch);
  } catch (e) {
    dispatch(saveProfileFailure(e.response.data));
    const { message, type } = getErrorMessage(e);
    dispatchError(message, type, dispatch);
  }
};

export const profileData = () => async (dispatch) => {
  dispatch(fetchProfileBegin());
  try {
    const { data } = await apiRequest.getProfileData();
    dispatch(fetchProfileSuccess(data.profile));
  } catch (e) {
    dispatch(fetchProfileFailure(e));
    const { message, type } = getErrorMessage(e);
    dispatchError(message, type, dispatch);
  }
};
