import * as actionTypes from '../../constants/articles';
import apiRequest from '../../../services/apiRequest';
import { dispatchError, getErrorMessage, dispatchSuccess } from '../auth/register';


export const fetchBookmarkBegin = () => ({
  type: actionTypes.FETCH_BOOKMARK_ARTICLE_BEGIN,
});

export const fetchBookmarkSuccess = data => ({
  type: actionTypes.FETCH_BOOKMARK_ARTICLE_SUCCESS,
  data,
});

export const fetchBookmarkFailure = error => ({
  type: actionTypes.FETCH_BOOKMARK_ARTICLE_FAILURE,
  error,
});

export const removeBookmarkBegin = () => ({
  type: actionTypes.REMOVE_BOOKMARK_ARTICLE_BEGIN,
});

export const removeBookmarkSuccess = data => ({
  type: actionTypes.REMOVE_BOOKMARK_ARTICLE_SUCCESS,
  data,
});

export const removeBookmarkFailure = error => ({
  type: actionTypes.REMOVE_BOOKMARK_ARTICLE_FAILURE,
  error,
});

export const invalidAction = () => ({
  type: actionTypes.INVALID_ACTION
});

export const fetchArticlesFromStore = (pageToLoad, size) => ({
  type: actionTypes.FETCH_ARTICLES_FROM_STORE,
  size,
  pageToLoad
});


export const fetchBookmarkArticle = (pageToLoad, size) => async (dispatch) => {
  dispatch(fetchBookmarkBegin());
  try {
    const { data } = await apiRequest.getBookmarkArticle(pageToLoad, size);
    dispatch(fetchBookmarkSuccess(data.data));
  } catch (e) {
    dispatch(fetchBookmarkFailure(e.response));
    const { message, type } = getErrorMessage(e);
    dispatchError(message, type, dispatch);
  }
};


export const removeBookmarkArticle = slug => async (dispatch) => {
  dispatch(removeBookmarkBegin());
  try {
    const { data } = await apiRequest.removeBookmarkArticle(slug);
    dispatch(removeBookmarkSuccess(data));
    dispatchSuccess(data.message, 'alert', dispatch);
  } catch (e) {
    dispatch(removeBookmarkFailure(e.response));
    const { message, type } = getErrorMessage(e);
    dispatchError(message, type, dispatch);
  }
};

export const fetchArticlePage = page => (dispatch, getState) => {
  if (![1, -1].includes(page)) return dispatch(invalidAction());
  const {
    currentPage, size, pagesFetched, totalPages
  } = getState().bookmark;
  const pageToLoad = currentPage + page;
  if (pageToLoad > totalPages || pageToLoad < 1) {
    return dispatch(invalidAction());
  }
  if (pageToLoad > pagesFetched && pagesFetched < totalPages) {
    return dispatch(fetchBookmarkArticle(pageToLoad, size));
  }
  if (pageToLoad <= pagesFetched && pagesFetched <= totalPages) {
    return dispatch(fetchArticlesFromStore(pageToLoad, size));
  }
  return dispatch(invalidAction());
};
