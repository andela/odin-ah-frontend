import * as actionTypes from '../../constants';
import apiRequest from '../../../services/apiRequest';
import { dispatchError, getErrorMessage } from '../auth/register';

export const fetchStatisticsBegin = () => ({
  type: actionTypes.FETCH_STATISTICS_BEGIN,
});

export const fetchStatisticsSuccess = data => ({
  type: actionTypes.FETCH_STATISTICS_SUCCESS,
  data,
});

export const fetchStatisticsFailure = error => ({
  type: actionTypes.FETCH_STATISTICS_FAILURE,
  error,
});

export const fetchStatistics = () => async (dispatch) => {
  dispatch(fetchStatisticsBegin());
  try {
    const { data } = await apiRequest.fetchStatistics();
    dispatch(fetchStatisticsSuccess(data));
  } catch (e) {
    dispatch(fetchStatisticsFailure(e));
    const { message, type } = getErrorMessage(e);
    dispatchError(message, type, dispatch);
  }
};
