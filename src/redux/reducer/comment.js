import {
  COMMENT_POSTED,
  LOADING_COMMENTS,
  SHOW_COMMENT_ERROR,
  SENDING_COMMENT,
  SHOW_ARTICLE_COMMENTS,
  SHOW_GET_COMMENTS_ERROR,
  RESET_REFRESH_ARTICLE_COMMENTS,
} from '../constants/comment';

const initialState = {
  comments: []
};

export default (state = initialState, action) => {
  const { type, comment, comments } = action;
  switch (type) {
    case LOADING_COMMENTS:
      return { ...state };
    case SHOW_ARTICLE_COMMENTS:
      return { ...state, comments };
    case SHOW_GET_COMMENTS_ERROR:
      return { ...state };
    case SENDING_COMMENT:
      return { ...state, sendingComment: true };
    case COMMENT_POSTED:
      return {
        ...state, newComment: comment, sendingComment: false, refreshComments: true
      };
    case SHOW_COMMENT_ERROR:
      return { ...state, sendingComment: false };
    case RESET_REFRESH_ARTICLE_COMMENTS:
      return { ...state, refreshComments: undefined };
    default:
      return state;
  }
};
