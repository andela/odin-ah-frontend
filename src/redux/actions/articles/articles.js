import apiRequest from '../../../services/apiRequest';

import {
  SENDING_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_ERROR,
  OPEN_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL,
  SHOW_PUBLISH_ERROR,
  HIDE_PUBLISH_ERROR,
  HIDE_PUBLISH_RESPONSE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  DELETE_ARTICLE,
  BOOKMARK_ARTICLE_BEGINS,
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAILURE,
  LOADING_ARTICLES_BY_TAG,
  GET_ARTICLES_BY_TAG,
  ARTICLES_BY_TAG_ERROR
} from '../../constants/articles';
import { showAlert } from '../notification';
import { redirect } from '../redirect';

export const openPublishModal = () => ({
  type: OPEN_PUBLISH_MODAL
});
export const closePublishModal = () => ({
  type: CLOSE_PUBLISH_MODAL
});
export const showCreateError = errors => ({
  type: SHOW_PUBLISH_ERROR,
  errors
});
export const hideCreateError = () => ({
  type: HIDE_PUBLISH_ERROR
});
export const hideCreateResponse = () => ({
  type: HIDE_PUBLISH_RESPONSE
});

export const bookmarkArticleBegins = () => ({
  type: BOOKMARK_ARTICLE_BEGINS
});

export const bookmarkArticleSuccess = data => ({
  type: BOOKMARK_ARTICLE_SUCCESS,
  data
});

export const bookmarkArticleFailure = error => ({
  type: BOOKMARK_ARTICLE_FAILURE,
  error
});


export const createArticleRequest = articleData => (dispatch) => {
  dispatch({
    type: SENDING_REQUEST
  });
  return apiRequest.createArticle(articleData)
    .then((res) => {
      const { status: statusCode } = res;
      const responseMessage = statusCode === 201 ? 'Article has been published successfully!' : res.data.message;
      dispatch({
        type: CREATE_ARTICLE_SUCCESS,
        response: responseMessage
      });
      return statusCode;
    })
    .catch((err) => {
      const { response } = err;
      const { status: statusCode } = response;
      dispatch({
        type: CREATE_ARTICLE_ERROR,
        response: err.response.data
      });
      return statusCode;
    });
};


export const getArticle = slug => (dispatch) => {
  // change to sending_request
  dispatch({
    type: SENDING_REQUEST
  });
  return apiRequest.getArticle(slug)
    .then((res) => {
      dispatch({
        type: GET_ARTICLE_SUCCESS,
        response: res.data
      });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({
        type: GET_ARTICLE_ERROR,
        response: response.data,
        statusCode: response.status
      });
    });
};

export const updateArticleRequest = (slug, articleData) => (dispatch) => {
  dispatch({
    type: SENDING_REQUEST
  });
  return apiRequest.updateArticle(slug, articleData)
    .then((res) => {
      const { status: statusCode } = res;
      const responseMessage = statusCode === 200 ? 'Article has been updated successfully!' : res.data.message;
      dispatch({
        type: UPDATE_ARTICLE_SUCCESS,
        response: responseMessage
      });
      return statusCode;
    })
    .catch((err) => {
      const { response } = err;
      const { status: statusCode } = response;
      dispatch({
        type: UPDATE_ARTICLE_ERROR,
        response: err.response.data
      });
      return statusCode;
    });
};

export const deleteRequest = (loading, result, error) => ({
  type: DELETE_ARTICLE,
  deleteArticle: {
    error,
    loading,
    result
  }
});

export const deleteArticle = slug => async (dispatch) => {
  try {
    dispatch(deleteRequest(true));
    await apiRequest.deleteArticle(slug);
    dispatch(redirect('/'));
  } catch (error) {
    dispatch(deleteRequest(false, null, error));
  }
};

export const bookMarkArticle = slug => async (dispatch) => {
  try {
    dispatch(bookmarkArticleBegins());
    await apiRequest.bookMarkArticle(slug);
    dispatch(bookmarkArticleSuccess(true));
  } catch (error) {
    dispatch(bookmarkArticleFailure(error));
  }
};

export const getArticlesByTagError = errors => ({
  type: ARTICLES_BY_TAG_ERROR,
  errors,
});

export const getArticlesByTag = tagName => (dispatch) => {
  dispatch({
    type: LOADING_ARTICLES_BY_TAG
  });
  return apiRequest.getArticlesByTag(tagName)
    .then((res) => {
      dispatch({
        type: GET_ARTICLES_BY_TAG,
        response: res.data.data
      });
    })
    .catch((err) => {
      if (err.message && err.message === 'Network Error') {
        const error = { message: 'Could not connect to server. Please check your connection' };
        dispatch(getArticlesByTagError(error));
        showAlert({
          type: 'error',
          text: error.message
        });
      } else {
        dispatch(getArticlesByTagError(err.response.data));
      }
    });
};
