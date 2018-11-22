import * as actionTypes from '../../constants/articles';

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
  totalCount: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKMARK_ARTICLE_BEGIN:
      return { ...state, loadingArticles: true, error: null };
    case actionTypes.FETCH_BOOKMARK_ARTICLE_SUCCESS: {
      const noPageChange = action.data.page <= state.currentPage;
      const fetchedArticles = action.data.bookmarks.article;
      const articles = noPageChange ? fetchedArticles : state.articles.concat(fetchedArticles);
      const pagesFetched = noPageChange ? state.pagesFetched : state.pagesFetched + 1;
      const { size } = action.data;
      const sliceStart = (action.data.page - 1) * 20;
      const sliceEnd = action.data.page * 20;
      return {
        ...state,
        articles,
        currentPage: action.data.page,
        totalPages: action.data.totalPages,
        totalCount: action.data.total,
        size,
        pagesFetched,
        loadingArticles: false,
        articlesError: false,
        articlesInView: articles.slice(sliceStart, sliceEnd)
      }; }
    case actionTypes.FETCH_BOOKMARK_ARTICLE_FAILURE: return { ...state, ...action };
    case actionTypes.REMOVE_BOOKMARK_ARTICLE_BEGIN: return { ...state, loadingArticles: true, };
    case actionTypes.REMOVE_BOOKMARK_ARTICLE_SUCCESS:
      return { ...state, loadingArticles: false, ...action };
    case actionTypes.REMOVE_BOOKMARK_ARTICLE_FAILURE:
      return { ...state, loading: false, ...action };
    case actionTypes.FETCH_ARTICLES_FROM_STORE:
    {
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
    default: return state;
  }
};

export default reducer;
