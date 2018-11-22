import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  UPDATE_FOLLOW_LIST_LOADED,
  UPDATE_FOLLOW_LIST_ERROR,
  UPDATE_FOLLOW_LIST_LOADING
} from '../../actions/users/followList';

const initialState = {
  followList: [],
  ongoingFetchOperations: [],
  fetchError: false,
  fetchErrorMessage: '',
  isLoading: false,
  updateError: false,
  updateErrorMessage: ''
};

const followList = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FOLLOW_LIST_SUCCESS:
      return {
        ...state,
        followList: action.payload.data.usersIFollow.map(user => user.userId),
        fetchError: false,
        fetchErrorMessage: '',
        isLoading: false
      };
    case FETCH_FOLLOW_LIST_ERROR:
      return {
        ...state,
        fetchError: true,
        fetchErrorMessage: action.payload,
        isLoading: false
      };
    case FETCH_FOLLOW_LIST_LOADING:
      return {
        ...state,
        fetchError: false,
        fetchErrorMessage: '',
        isLoading: true
      };
    case UPDATE_FOLLOW_LIST_LOADED: {
      const { userId, status } = action.payload;
      const userIndexInFollowList = state.followList.findIndex(id => id === userId);
      const opIndex = state.ongoingFetchOperations.findIndex(id => id === userId);
      if (status) {
        state.followList.splice(userIndexInFollowList, 1);
      } else {
        state.followList.push(userId);
      }
      state.ongoingFetchOperations.splice(opIndex, 1);
      return {
        ...state,
        ongoingFetchOperations: [],
        updateError: false,
        updateErrorMessage: ''
      };
    }
    case UPDATE_FOLLOW_LIST_LOADING: {
      const { userId } = action.payload;
      state.ongoingFetchOperations.push(userId);
      return {
        ...state,
        updateError: false,
        updateErrorMessage: ''
      };
    }
    case UPDATE_FOLLOW_LIST_ERROR: {
      const { userId, error } = action.payload;
      const opIndex = state.ongoingFetchOperations.findIndex(id => id === userId);
      state.ongoingFetchOperations.splice(opIndex, 1);
      return {
        ...state,
        updateError: true,
        updateErrorMessage: error
      };
    }
    default:
      return state;
  }
};

export default followList;
