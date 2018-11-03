import apiRequest from '../../../services/apiRequest';

import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  OPEN_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL,
  SHOW_PUBLISH_ERROR,
  HIDE_PUBLISH_ERROR
} from '../../constants/articles';

// remove line once login is implemented
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJJZCI6MSwiaWF0IjoxNTQxNjE4Mzc0LCJleHAiOjE1NDE3MDQ3NzR9.yvGZdWwpIBIjf6-0jFTzNL4fH5tYRfKvBHfhqMPrEfY';
apiRequest.setToken(token);

export const openPublishModal = () => ({
  type: OPEN_PUBLISH_MODAL,
});
export const closePublishModal = () => ({
  type: CLOSE_PUBLISH_MODAL
});
export const showCreateError = errors => ({
  type: SHOW_PUBLISH_ERROR,
  errors
});
export const hideCreateError = () => ({
  type: HIDE_PUBLISH_ERROR,
});
export const createArticleRequest = articleData => (dispatch) => {
  dispatch({
    type: CREATE_ARTICLE_REQUEST,
    loading: true
  });
  return apiRequest.createArticle(articleData).then((res) => {
    const { status: statusCode } = res;
    const responseMessage = statusCode === 201 ? 'Article has been published successfully!' : res.data.message;
    dispatch({
      type: CREATE_ARTICLE_SUCCESS,
      loading: false,
      response: responseMessage
    });
    return statusCode;
  }).catch((err) => {
    const { response } = err;
    const { status: statusCode } = response;
    dispatch({
      type: CREATE_ARTICLE_ERROR,
      loading: false,
      response: err.response
    });
    dispatch(closePublishModal());
    return statusCode;
  });
};
