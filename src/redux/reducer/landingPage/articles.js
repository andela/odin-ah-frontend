import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING,
  FETCH_ARTICLES_FROM_STORE,
  INVALID_ACTION
} from '../../actions/landingPage/articles';

const initialState = {
  articles: [],
  loadingArticles: false,
  articlesError: false,
  articlesErrorMessage: '',
  articlesInView: [],
  totalPages: null,
  currentPage: null,
  size: 20,
  pagesFetched: 0,
  totalCount: 0
};

const landingPageArticles = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS: {
      const noPageChange = action.payload.data.page <= state.currentPage;
      const fetchedArticles = action.payload.data.articles;
      const articles = noPageChange ? fetchedArticles : state.articles.concat(fetchedArticles);
      const pagesFetched = noPageChange ? state.pagesFetched : state.pagesFetched + 1;
      const { size } = action.payload.data;
      const sliceStart = (action.payload.data.page - 1) * 20;
      const sliceEnd = action.payload.data.page * 20;
      return {
        ...state,
        articles,
        currentPage: action.payload.data.page,
        totalPages: action.payload.data.totalPages,
        totalCount: action.payload.data.total,
        size,
        pagesFetched,
        loadingArticles: false,
        articlesError: false,
        articlesInView: articles.slice(sliceStart, sliceEnd)
      };
    }
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
    case FETCH_ARTICLES_FROM_STORE: {
      const { articles } = state;
      const sliceStart = (action.pageToLoad - 1) * 20;
      const sliceEnd = action.pageToLoad * 20;
      return {
        ...state,
        currentPage: action.pageToLoad,
        loadingArticles: false,
        articlesError: false,
        articlesInView: articles.slice(sliceStart, sliceEnd)
      };
    }
    case INVALID_ACTION:
      return state;
    default:
      return state;
  }
};

export default landingPageArticles;
