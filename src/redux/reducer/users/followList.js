import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  FETCH_SINGLE_FOLLOW_SUCCESS,
  FETCH_SINGLE_FOLLOW_ERROR,
  FETCH_SINGLE_FOLLOW_LOADING,
  SYNC_FOLLOW_LIST
} from '../../actions/users/followList';

const initialState = {
  followList: [],
  singleFollowStream: {},
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  storeIsSynced: false
};

const followList = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FOLLOW_LIST_SUCCESS: {
      const {
        usersIFollow, page, totalPages, total
      } = action.payload.data;
      return {
        ...state,
        followList: usersIFollow,
        currentPage: page,
        totalPages,
        isLoading: false,
        total,
        storeIsSynced: true
      };
    }
    case FETCH_FOLLOW_LIST_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_FOLLOW_LIST_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SINGLE_FOLLOW_SUCCESS:
      return {
        ...state,
        singleFollowStream: { ...action.payload }
      };
    case FETCH_SINGLE_FOLLOW_ERROR:
      return {
        ...state,
        singleFollowStream: { ...action.payload }
      };
    case FETCH_SINGLE_FOLLOW_LOADING:
      return {
        ...state,
        singleFollowStream: { ...action.payload }
      };
    case SYNC_FOLLOW_LIST:
      return {
        ...state,
        storeIsSynced: false
      };
    default:
      return state;
  }
};

export default followList;
