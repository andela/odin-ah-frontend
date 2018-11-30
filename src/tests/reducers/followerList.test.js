import {
  FETCH_FOLLOWER_LIST_SUCCESS,
  FETCH_FOLLOWER_LIST_ERROR,
  FETCH_FOLLOWER_LIST_LOADING
} from '../../redux/actions/users/followerList';
import followerList from '../../redux/reducer/users/followerList';

const initialState = {
  followerList: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  total: 0
};

it('should not update follower list', () => {
  const newState = followerList(initialState);
  expect(newState).toEqual(initialState);
});

it('updates state with followers fetched', () => {
  const action = {
    type: FETCH_FOLLOWER_LIST_SUCCESS,
    payload: {
      data: {
        myFollowers: [{ userId: 0 }],
        page: 1,
        totalPages: 1,
        total: 1
      }
    }
  };
  const newState = followerList(initialState, action);
  const {
    myFollowers, page, totalPages, total
  } = action.payload.data;
  expect(newState).toEqual({
    ...initialState,
    followerList: myFollowers,
    currentPage: page,
    totalPages,
    isLoading: false,
    total
  });
});

it('update follower list with error if error occurs', () => {
  const action = {
    type: FETCH_FOLLOWER_LIST_ERROR,
    payload: 'An error occurred'
  };
  const newState = followerList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    isLoading: false
  });
});

it('update state with loading if list is loading', () => {
  const action = {
    type: FETCH_FOLLOWER_LIST_LOADING
  };
  const newState = followerList(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    isLoading: true
  });
});
