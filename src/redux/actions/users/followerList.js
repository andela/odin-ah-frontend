import apiRequest from '../../../services/apiRequest';

export const FETCH_FOLLOWER_LIST_SUCCESS = 'FETCH_FOLLOWER_LIST_SUCCESS';
export const FETCH_FOLLOWER_LIST_ERROR = 'FETCH_FOLLOWER_LIST_ERROR';
export const FETCH_FOLLOWER_LIST_LOADING = 'FETCH_FOLLOWER_LIST_LOADING';

export const fetchFollowerListFailed = error => ({
  type: FETCH_FOLLOWER_LIST_ERROR,
  payload: error
});

export const fetchFollowerListSucceeded = data => ({
  type: FETCH_FOLLOWER_LIST_SUCCESS,
  payload: data
});

export const fetchFollowerListLoading = status => ({
  type: FETCH_FOLLOWER_LIST_LOADING,
  payload: status
});

export const fetchFollowerList = (page, limit) => async (dispatch) => {
  try {
    dispatch(fetchFollowerListLoading(true));
    const result = await apiRequest.fetchFollowerList(page, limit);
    const { data } = result;
    dispatch(fetchFollowerListSucceeded(data));
  } catch (err) {
    if (err.response) {
      dispatch(fetchFollowerListFailed(err.response.data));
    } else {
      dispatch(
        fetchFollowerListFailed('Could not connect to server. Please check your connection')
      );
    }
  }
};
