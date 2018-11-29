import {
  FETCH_FOLLOWER_LIST_SUCCESS,
  FETCH_FOLLOWER_LIST_ERROR,
  FETCH_FOLLOWER_LIST_LOADING
} from '../../actions/users/followerList';

const initialState = {
  followerList: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  total: 0
};

const followerList = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FOLLOWER_LIST_SUCCESS: {
      const {
        myFollowers, page, totalPages, total
      } = action.payload.data;
      return {
        ...state,
        followerList: myFollowers,
        currentPage: page,
        totalPages,
        isLoading: false,
        total
      };
    }
    case FETCH_FOLLOWER_LIST_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_FOLLOWER_LIST_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default followerList;
