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
  GET_ARTICLE_ERROR
} from '../../constants/articles';

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
export const createArticleRequest = articleData => (dispatch) => {
  dispatch({
    type: SENDING_REQUEST
  });
  return apiRequest.createArticle(articleData).then((res) => {
    const { status: statusCode } = res;
    const responseMessage = statusCode === 201 ? 'Article has been published successfully!' : res.data.message;
    dispatch({
      type: CREATE_ARTICLE_SUCCESS,
      response: responseMessage
    });
    return statusCode;
  }).catch((err) => {
    const { response } = err;
    const { status: statusCode } = response;
    dispatch({
      type: CREATE_ARTICLE_ERROR,
      response: err.response.data
    });
    return statusCode;
  });
};


export const getArticleForUpdate = slug => (dispatch) => {
  // change to sending_request
  dispatch({
    type: SENDING_REQUEST
  });
  return apiRequest.getArticle(slug).then((res) => {
    dispatch({
      type: GET_ARTICLE_SUCCESS,
      response: res.data
    });
  }).catch((err) => {
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
  return apiRequest.updateArticle(slug, articleData).then((res) => {
    const { status: statusCode } = res;
    const responseMessage = statusCode === 200 ? 'Article has been updated successfully!' : res.data.message;
    dispatch({
      type: UPDATE_ARTICLE_SUCCESS,
      response: responseMessage
    });
    return statusCode;
  }).catch((err) => {
    const { response } = err;
    const { status: statusCode } = response;
    dispatch({
      type: UPDATE_ARTICLE_ERROR,
      response: err.response.data
    });
    return statusCode;
  });
};
