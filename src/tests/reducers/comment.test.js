import commentReducer from '../../redux/reducer/comment';
import {
  LOADING_COMMENTS,
  SHOW_ARTICLE_COMMENTS,
  SHOW_GET_COMMENTS_ERROR,
  SENDING_COMMENT,
  COMMENT_POSTED,
  SHOW_COMMENT_ERROR,
  RESET_REFRESH_ARTICLE_COMMENTS
} from '../../redux/constants/comment';

const initialState = { comments: [] };
describe('Comment reducer', () => {
  it('should return the initial state when action type is not handled', () => {
    const action = { type: 'UNHANDLED_ACTION' };
    const state = commentReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('should handle LOADING_COMMENTS action correctly', () => {
    const action = { type: LOADING_COMMENTS };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
  it('should handle SHOW_ARTICLE_COMMENTS action correctly', () => {
    const comments = [{ body: 'the comment' }];
    const action = { type: SHOW_ARTICLE_COMMENTS, comments };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ comments });
  });
  it('should handle SHOW_GET_COMMENTS_ERROR action correctly', () => {
    const action = { type: SHOW_GET_COMMENTS_ERROR };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
  it('should handle SENDING_COMMENT action correctly', () => {
    const action = { type: SENDING_COMMENT };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ ...initialState, sendingComment: true });
  });
  it('should handle COMMENT_POSTED action correctly', () => {
    const action = { type: COMMENT_POSTED };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({
      ...initialState, newComment: undefined, refreshComments: true, sendingComment: false
    });
  });
  it('should handle SHOW_COMMENT_ERROR action correctly', () => {
    const action = { type: SHOW_COMMENT_ERROR };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ ...initialState, sendingComment: false });
  });
  it('should handle RESET_REFRESH_ARTICLE_COMMENTS action correctly', () => {
    const action = { type: RESET_REFRESH_ARTICLE_COMMENTS };
    const state = commentReducer(initialState, action);
    expect(state).toEqual({ ...initialState, refreshComments: undefined });
  });
});
