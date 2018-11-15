import apiRequest from '../../../services/apiRequest';

export const FETCH_PTAGS_SUCCESS = 'FETCH_PTAGS_SUCCESS';
export const FETCH_PTAGS_ERROR = 'FETCH_PTAGS_ERROR';
export const FETCH_PTAGS_LOADING = 'FETCH_PTAGS_LOADING';

export const fetchPtagsFailed = error => ({
  type: FETCH_PTAGS_ERROR,
  payload: error
});
export const fetchPtagsSucceeded = data => ({
  type: FETCH_PTAGS_SUCCESS,
  payload: data
});
export const fetchPtagsStarted = () => ({
  type: FETCH_PTAGS_LOADING
});
export const fetchPtags = () => async (dispatch) => {
  try {
    dispatch(fetchPtagsStarted());
    const result = await apiRequest.fetchPopularTags();
    const { data } = result;
    dispatch(fetchPtagsSucceeded(data));
  } catch (err) {
    if (err.response) {
      dispatch(fetchPtagsFailed(err.response.data));
    } else if (err.request) {
      dispatch(fetchPtagsFailed('Could not connect to server. Please check your connection'));
    } else {
      dispatch(fetchPtagsFailed('An error occurred. Please try again'));
    }
  }
};
