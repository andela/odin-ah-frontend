import { LOADING_ARTICLES_BY_TAG, GET_ARTICLES_BY_TAG, ARTICLES_BY_TAG_ERROR } from '../constants/articles';

const initialState = {
  articles: [],
  loading: false
};

export default (state = initialState, action) => {
  const { type, response, errors } = action;
  switch (type) {
    case LOADING_ARTICLES_BY_TAG:
      return { ...state, loading: true };
    case GET_ARTICLES_BY_TAG:
      return { ...state, ...response, loading: false };
    case ARTICLES_BY_TAG_ERROR:
      return { ...state, loading: false, errors };
    default:
      return state;
  }
};
