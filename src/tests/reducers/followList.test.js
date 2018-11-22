import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  UPDATE_FOLLOW_LIST_LOADED,
  UPDATE_FOLLOW_LIST_ERROR,
  UPDATE_FOLLOW_LIST_LOADING
} from '../../redux/actions/users/followList';
import followList from '../../redux/reducer/users/followList';

const initialState = {
  followList: [],
  ongoingFetchOperations: [],
  fetchError: false,
  fetchErrorMessage: '',
  isLoading: false,
  updateError: false,
  updateErrorMessage: ''
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
        usersIFollow: [{ userId: 0 }]
      }
    }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    followList: action.payload.data.usersIFollow.map(user => user.userId),
    fetchError: false,
    fetchErrorMessage: '',
    isLoading: false
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
    fetchError: true,
    fetchErrorMessage: action.payload,
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
    fetchError: false,
    fetchErrorMessage: '',
    isLoading: true
  });
});

it('updates follow list when user follows', () => {
  const action = {
    type: UPDATE_FOLLOW_LIST_LOADED,
    payload: {
      userId: 1,
      status: false
    }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    followList: [1],
    ongoingFetchOperations: [],
    updateError: false,
    updateErrorMessage: ''
  });
});

it('updates follow list when user unfollows', () => {
  const action = {
    type: UPDATE_FOLLOW_LIST_LOADED,
    payload: {
      userId: 1,
      status: true
    }
  };
  const newState = followList(otherState1, action);
  expect(newState).toEqual({
    ...otherState1,
    followList: [],
    ongoingFetchOperations: [],
    updateError: false,
    updateErrorMessage: ''
  });
});

it('update state with loading if list is updating', () => {
  const action = {
    type: UPDATE_FOLLOW_LIST_LOADING,
    payload: { userId: 1 }
  };
  const newState = followList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    ongoingFetchOperations: [1],
    updateError: false,
    updateErrorMessage: ''
  });
});

it('update state with update error if update failed', () => {
  const action = {
    type: UPDATE_FOLLOW_LIST_ERROR,
    payload: { userId: 1, error: 'An error occurred' }
  };
  const newState = followList(otherState2, action);
  expect(newState).toEqual({
    ...otherState2,
    ongoingFetchOperations: [],
    updateError: true,
    updateErrorMessage: 'An error occurred'
  });
});
