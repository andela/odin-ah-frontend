import * as actionTypes from '../../constants/index';

const initialState = {
  error: {},
  loading: false,
  profileMenuIsActive: false
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PROFILE_MENU_CLICKED: return {
      ...state, profileMenuIsActive: !state.profileMenuIsActive
    };
    case actionTypes.FETCH_PROFILE_BEGIN: return {
      ...state, loading: true, error: null
    };
    case actionTypes.FETCH_PROFILE_SUCCESS: return {
      ...state, loading: false, ...action
    };
    case actionTypes.FETCH_PROFILE_FAILURE: return { ...state, ...action };
    case actionTypes.SAVE_PROFILE_BEGIN: return { ...state, loading: true };
    case actionTypes.SAVE_PROFILE_SUCCESS: return { ...state, loading: false, ...action.data };
    case actionTypes.SAVE_PROFILE_FAILURE: return { ...state, loading: false, ...action };
    default: return state;
  }
};

export default reducer;
