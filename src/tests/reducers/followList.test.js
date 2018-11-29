/* eslint-disable */
import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  FETCH_SINGLE_FOLLOW_SUCCESS,
  FETCH_SINGLE_FOLLOW_ERROR,
  FETCH_SINGLE_FOLLOW_LOADING,
  SYNC_FOLLOW_LIST
} from '../../redux/actions/users/followList';
import followList from '../../redux/reducer/users/followList';

const initialState = {
  followList: [],
  singleFollowStream: {},
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  storeIsSynced: false
};

const otherState1 = {
  ...initialState,
  followList: [1],
  ongoingFetchOperations: [1]
};

const otherState2 = {
  ...initialState,
  ongoingFetchOperations: [1]
};

it('should not update follow list', () => {
  const newState = followList(initialState);
  expect(newState).toEqual(initialState);
});

it('updates state with follows fetched', () => {
  const action = {
    type: FETCH_FOLLOW_LIST_SUCCESS,
    payload: {
      data: {
        usersIFollow: [{ userId: 0 }],
        page: 1,
        totalPages: 1,
        total: 1
      }
    }
  };
  const newState = followList(initialState, action);
  const { usersIFollow, page, totalPages, total } = action.payload.data;
  expect(newState).toEqual({
    ...initialState,
    followList: usersIFollow,
    currentPage: page,
    totalPages,
    isLoading: false,
    total,
    storeIsSynced: true
  });
});

it('update follow list with error if error occurs', () => {
  const action = {
    type: FETCH_FOLLOW_LIST_ERROR,
    payload: 'An error occurred'
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    isLoading: false
  });
});

it('update state with loading if list is loading', () => {
  const action = {
    type: FETCH_FOLLOW_LIST_LOADING
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    isLoading: true
  });
});

it('update stream with single follow sucess', () => {
  const action = {
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      userId: 1,
      status: false
    }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    singleFollowStream: { ...action.payload }
  });
});

it('update stream with single follow error', () => {
  const action = {
    type: FETCH_SINGLE_FOLLOW_ERROR,
    payload: {
      userId: 1,
      status: false
    }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    singleFollowStream: { ...action.payload }
  });
});

it('update stream with single follow loading', () => {
  const action = {
    type: FETCH_SINGLE_FOLLOW_LOADING,
    payload: {
      userId: 1,
      status: false
    }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    singleFollowStream: { ...action.payload }
  });
});

it('should sync follow list', () => {
  const action = {
    type: SYNC_FOLLOW_LIST
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    storeIsSynced: false
  });
});
