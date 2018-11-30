import apiRequest from '../../../services/apiRequest';

export const FETCH_FOLLOW_LIST_SUCCESS = 'FETCH_FOLLOW_LIST_SUCCESS';
export const FETCH_FOLLOW_LIST_ERROR = 'FETCH_FOLLOW_LIST_ERROR';
export const FETCH_FOLLOW_LIST_LOADING = 'FETCH_FOLLOW_LIST_LOADING';
export const FETCH_SINGLE_FOLLOW_LOADING = 'FETCH_SINGLE_FOLLOW_LOADING';
export const FETCH_SINGLE_FOLLOW_SUCCESS = 'FETCH_SINGLE_FOLLOW_SUCCESS';
export const FETCH_SINGLE_FOLLOW_ERROR = 'FETCH_SINGLE_FOLLOW_ERROR';
export const FETCH_SINGLE_FOLLOW = 'FETCH_SINGLE_FOLLOW';
export const FETCH_SINGLE_FOLLOW_STATE = 'FETCH_SINGLE_FOLLOW_STATE';
export const SYNC_FOLLOW_LIST = 'SYNC_FOLLOW_LIST';

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

export const fetchSingleFollowLoading = authorId => ({
  type: FETCH_SINGLE_FOLLOW_LOADING,
  payload: {
    done: false,
    status: false,
    authorId,
    error: false
  }
});

export const fetchSingleFollowSuccess = (authorId, status) => ({
  type: FETCH_SINGLE_FOLLOW_SUCCESS,
  payload: {
    done: true,
    status,
    authorId,
    error: false
  }
});

export const fetchSingleFollowFailed = (authorId, status) => ({
  type: FETCH_SINGLE_FOLLOW_ERROR,
  payload: {
    done: true,
    status,
    authorId,
    error: true
  }
});

export const syncFollowList = () => ({
  type: SYNC_FOLLOW_LIST
});

export const fetchFollowList = (page, limit) => async (dispatch) => {
  try {
    dispatch(fetchFollowListLoading(true));
    const result = await apiRequest.fetchFollowList(page, limit);
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

export const updateFollowList = (authorId, isFollowing) => async (dispatch) => {
  try {
    dispatch(fetchSingleFollowLoading(authorId));
    if (isFollowing) {
      await apiRequest.unfollowUser(authorId);
    } else {
      await apiRequest.followUser(authorId);
    }
    dispatch(fetchSingleFollowSuccess(authorId, !isFollowing));
    dispatch(syncFollowList());
  } catch (err) {
    dispatch(fetchSingleFollowFailed(authorId, isFollowing));
  }
};

export const fetchSingleFollow = authorId => async (dispatch) => {
  try {
    dispatch(fetchSingleFollowLoading(authorId));
    const response = await apiRequest.fetchSingleFollow(authorId);
    const {
      data: {
        data: { usersIFollow }
      }
    } = response;
    if (usersIFollow.length) {
      dispatch(fetchSingleFollowSuccess(authorId, true));
    } else {
      dispatch(fetchSingleFollowSuccess(authorId, false));
    }
  } catch (err) {
    dispatch(fetchSingleFollowFailed(authorId, false));
  }
};
