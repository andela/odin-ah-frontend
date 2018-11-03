import apiRequest from '../../../services/apiRequest';

import {
  SENDING_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  OPEN_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL,
  SHOW_PUBLISH_ERROR,
  HIDE_PUBLISH_ERROR,
  HIDE_PUBLISH_RESPONSE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR
} from '../../constants/articles';

// remove line once login is implemented
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJJZCI6NiwiaWF0IjoxNTQxNzU3MjU1LCJleHAiOjE1NDE4NDM2NTV9.SQNxxghFiFipVNGkaLQkGuvQ0Je5iCIP_cL2SVhdtu4';
apiRequest.setToken(token);

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
