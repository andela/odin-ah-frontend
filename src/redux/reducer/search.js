import { SEARCH_RESULT } from '../actions/search';

const search = (state = {
  results: {},
  metadata: {},
  error: null
}, action) => {
  const { type, ...payload } = action;
  if (type === SEARCH_RESULT) {
    return { ...state, ...payload };
  }
  return state;
};

export default search;
