import apiRequest from '../../../services/apiRequest';
import { showAlert } from '../notification';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';
export const FETCH_ARTICLES_LOADING = 'FETCH_ARTICLES_LOADING';
export const FETCH_ARTICLES_FROM_STORE = 'FETCH_ARTICLES_FROM_STORE';
export const INVALID_ACTION = 'INVALID_ACTION';

export const fetchArticlesFailed = error => ({
  type: FETCH_ARTICLES_ERROR,
  payload: error
});

export const fetchArticlesSucceeded = data => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: data
});

export const fetchArticlesStarted = () => ({
  type: FETCH_ARTICLES_LOADING
});

export const invalidAction = () => ({
  type: INVALID_ACTION
});

export const fetchArticlesFromStore = (pageToLoad, size) => ({
  type: FETCH_ARTICLES_FROM_STORE,
  size,
  pageToLoad
});

export const fetchArticles = (pageToLoad, size) => async (dispatch) => {
  try {
    dispatch(fetchArticlesStarted());
    const result = await apiRequest.fetchArticles(pageToLoad, size);
    const { data } = result;
    dispatch(fetchArticlesSucceeded(data));
  } catch (err) {
    if (err.response) {
      dispatch(fetchArticlesFailed(err.response.data));
      dispatch(showAlert({ type: 'error', text: err.response.data.message }));
    } else if (err.request) {
      dispatch(
        showAlert({
          type: 'error',
          text: 'Could not connect to server. Please check your connection'
        })
      );
    } else {
      dispatch(showAlert({ type: 'error', text: 'An error occurred. Please try again' }));
    }
  }
};

export const fetchArticlePage = page => (dispatch, getState) => {
  if (![1, -1].includes(page)) return dispatch(invalidAction());
  const {
    currentPage, size, pagesFetched, totalPages
  } = getState().landingPageArticles;
  const pageToLoad = currentPage + page;
  if (pageToLoad > totalPages || pageToLoad < 1) {
    return dispatch(invalidAction());
  }
  if (pageToLoad > pagesFetched && pagesFetched < totalPages) {
    return dispatch(fetchArticles(pageToLoad, size));
  }
  if (pageToLoad <= pagesFetched && pagesFetched <= totalPages) {
    return dispatch(fetchArticlesFromStore(pageToLoad, size));
  }
  return dispatch(invalidAction());
};
