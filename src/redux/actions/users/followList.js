import apiRequest from '../../../services/apiRequest';

export const FETCH_FOLLOW_LIST_SUCCESS = 'FETCH_FOLLOW_LIST_SUCCESS';
export const FETCH_FOLLOW_LIST_ERROR = 'FETCH_FOLLOW_LIST_ERROR';
export const FETCH_FOLLOW_LIST_LOADING = 'FETCH_FOLLOW_LIST_LOADING';
export const UPDATE_FOLLOW_LIST_LOADING = 'UPDATE_FOLLOW_LIST_LOADING';
export const UPDATE_FOLLOW_LIST_LOADED = 'UPDATE_FOLLOW_LIST_LOADED';
export const UPDATE_FOLLOW_LIST_ERROR = 'UPDATE_FOLLOW_LIST_ERROR';

export const fetchFollowListFailed = error => ({
  type: FETCH_FOLLOW_LIST_ERROR,
  payload: error
});

export const fetchFollowListSucceeded = data => ({
  type: FETCH_FOLLOW_LIST_SUCCESS,
  payload: data
});

export const fetchFollowListLoading = status => ({
  type: FETCH_FOLLOW_LIST_LOADING,
  payload: status
});

export const updateFollowListLoading = (userId, status) => ({
  type: UPDATE_FOLLOW_LIST_LOADING,
  payload: { userId, status }
});

export const updateFollowListLoaded = (userId, status) => ({
  type: UPDATE_FOLLOW_LIST_LOADED,
  payload: { userId, status }
});

export const updateFollowListFailed = (error, userId) => ({
  type: UPDATE_FOLLOW_LIST_ERROR,
  payload: { error, userId }
});

export const fetchFollowList = () => async (dispatch) => {
  try {
    dispatch(fetchFollowListLoading());
    const result = await apiRequest.fetchFollowList();
    const { data } = result;
    dispatch(fetchFollowListSucceeded(data));
  } catch (err) {
    if (err.response) {
      dispatch(fetchFollowListFailed(err.response.data));
    } else if (err.request) {
      dispatch(fetchFollowListFailed('Could not connect to server. Please check your connection'));
    } else {
      dispatch(fetchFollowListFailed('An error occurred. Please try again'));
    }
  }
};

export const updateFollowList = (userId, isFollowing) => async (dispatch) => {
  try {
    dispatch(updateFollowListLoading(userId, true));
    if (isFollowing) {
      await apiRequest.unfollowUser(userId);
    } else {
      await apiRequest.followUser(userId);
    }
    dispatch(updateFollowListLoaded(userId, isFollowing));
  } catch (err) {
    if (err.response) {
      dispatch(updateFollowListFailed(err.response.data, userId));
    } else if (err.request) {
      dispatch(
        updateFollowListFailed('Could not connect to server. Please check your connection', userId)
      );
    } else {
      dispatch(updateFollowListFailed('An error occurred. Please try again', userId));
    }
  }
};
