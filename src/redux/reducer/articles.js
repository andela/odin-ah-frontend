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
  GET_ARTICLE_ERROR,
  UPDATE_ARTICLE_ERROR,
  UPDATE_ARTICLE_SUCCESS
} from '../constants/articles';
import { GET_COMMENTS } from '../actions/articles/comments';
import commentsReducer from './article/comments';

const defaultState = {
  open: false,
  errors: {},
};
const articleReducer = (state = defaultState, action) => {
  const {
    type, response, errors, statusCode
  } = action;
  switch (type) {
    case OPEN_PUBLISH_MODAL:
      return {
        ...state,
        open: true
      };
    case CLOSE_PUBLISH_MODAL:
      return {
        ...state,
        open: false
      };
    case SHOW_PUBLISH_ERROR:
      return {
        ...state, errors
      };
    case HIDE_PUBLISH_ERROR:
      return {
        ...state, errors: {}
      };
    case HIDE_PUBLISH_RESPONSE:
      return {
        ...state, response
      };
    case SENDING_REQUEST:
      return {
        ...state, loading: true, response, errors: {}
      };
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state, loading: false, open: false, response
      };
    case CREATE_ARTICLE_ERROR:
    case UPDATE_ARTICLE_ERROR:
      return {
        ...state, loading: false, open: false, errors: response
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state, loading: false, open: false, article: response.article
      };
    case GET_ARTICLE_ERROR:
      return {
        ...state, loading: false, open: false, errors: response, statusCode
      };
    case GET_COMMENTS:
      return {
        ...state, comment: commentsReducer(state.comment, action)
      };
    default:
      return state;
  }
};

export default articleReducer;
