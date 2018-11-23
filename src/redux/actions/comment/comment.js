import apiRequest from '../../../services/apiRequest';
import {
  LOADING_COMMENTS,
  SENDING_COMMENT,
  COMMENT_POSTED,
  SHOW_ARTICLE_COMMENTS,
  SHOW_COMMENT_ERROR,
  RESET_REFRESH_ARTICLE_COMMENTS
} from '../../constants/comment';
import { toast } from '../notification';

export const commentPosted = comment => ({
  type: COMMENT_POSTED,
  comment
});

export const sendingComment = () => ({
  type: SENDING_COMMENT
});

export const showArticleComments = comments => ({
  type: SHOW_ARTICLE_COMMENTS,
  comments
});

export const showCommentError = errors => ({
  type: SHOW_COMMENT_ERROR,
  errors
});

export const resetRefresh = () => ({
  type: RESET_REFRESH_ARTICLE_COMMENTS
});

export const sendComment = payload => (dispatch) => {
  dispatch(sendingComment());
  const { slug, comment } = payload;
  return apiRequest.postComment(slug, comment)
    .then((result) => {
      const { data, status } = result;
      const { comment: newComment } = data;
      const info = {
        text: 'Comment posted successful',
        type: 'success'
      };
      dispatch(toast(true, info));
      dispatch(commentPosted(newComment));
      return status;
    }).catch((error) => {
      let errors = [];
      const { message } = error;
      if (message && message === 'Network Error') {
        errors = ['Unable to connect to the internet'];
      } else {
        // if no errors array from server use message object
        const { data } = error.response;
        const { message: errorMessage } = data;
        errors = data.errors ? data.errors : [errorMessage];
      }
      const info = {
        text: errors[0],
        type: 'error'
      };
      dispatch(toast(true, info));
      dispatch(showCommentError(errors));
    });
};

/**
 *
 * @description gets comments for an article by slug/
 * it can also get replies to the comment if commentId is provided
 */
export const getComments = (slug, commentId) => (dispatch) => {
  dispatch({
    type: LOADING_COMMENTS,
  });
  return apiRequest.getComments(slug, commentId)
    .then((response) => {
      const { data: result, status } = response;
      const { comments } = result.data;
      dispatch(showArticleComments(comments));
      return status;
    });
};
