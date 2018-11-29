import * as actionTypes from '../../constants/index';

const initialState = {
  error: {},
  loading: false
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_STATISTICS_BEGIN: return { ...state, loading: true, error: null };
    case actionTypes.FETCH_STATISTICS_SUCCESS: return { ...state, loading: false, ...action };
    case actionTypes.FETCH_STATISTICS_FAILURE: return { ...state, ...action };
    default: return state;
  }
};

export default reducer;
