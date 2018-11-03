import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  OPEN_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL,
  SHOW_PUBLISH_ERROR,
  HIDE_PUBLISH_ERROR
} from '../constants/articles';

const defaultState = {
  open: false,
  errors: {}
};
const articleReducer = (state = defaultState, action) => {
  const {
    type, loading, response, errors
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
    case CREATE_ARTICLE_REQUEST:
      return {
        ...state, loading, response, errors: {}
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state, loading, open: false, response
      };
    case CREATE_ARTICLE_ERROR:
      return {
        ...state, loading, errors: response.data
      };
    default:
      return state;
  }
};

export default articleReducer;
