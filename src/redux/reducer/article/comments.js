import { GET_COMMENTS } from '../../actions/articles/comments';

const defaultState = {
  loading: false,
};
const commentsReducer = (state = defaultState, action) => {
  const {
    type, ...payload
  } = action;
  switch (type) {
    case GET_COMMENTS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default commentsReducer;
