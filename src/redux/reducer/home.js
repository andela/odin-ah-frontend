import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING
} from '../actions/home';

const initialState = {
  articles: [],
  loadingArticles: false,
  articlesError: false,
  articlesErrorMessage: ''
};

const home = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.data.articles,
        loadingArticles: false,
        articlesError: false
      };

    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        loadingArticles: false,
        articlesError: true,
        articlesErrorMessage: action.payload
      };

    case FETCH_ARTICLES_LOADING:
      return {
        ...state,
        loadingArticles: true,
        articlesError: false
      };

    default:
      return state;
  }
};

export default home;
