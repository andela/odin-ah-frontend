import articleReducer from '../../redux/reducer/articles';
import {
  OPEN_PUBLISH_MODAL,
  CLOSE_PUBLISH_MODAL,
  SHOW_PUBLISH_ERROR,
  HIDE_PUBLISH_ERROR,
  HIDE_PUBLISH_RESPONSE,
  SENDING_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR
} from '../../redux/constants/articles';

describe('articleReducer', () => {
  it('should return the initial state when action type is not handled', () => {
    const action = { type: 'UNHANDLED_ACTION' };
    const state = articleReducer(undefined, action);
    expect(state).toEqual({
      open: false,
      errors: {}
    });
  });
  it('should handle OPEN_PUBLISH_MODAL action correctly', () => {
    const action = { type: OPEN_PUBLISH_MODAL };
    const state = articleReducer(undefined, action);
    expect(state).toEqual({
      open: true,
      errors: {}
    });
  });
  it('should handle CLOSE_PUBLISH_MODAL action correctly', () => {
    const action = { type: CLOSE_PUBLISH_MODAL };
    const state = articleReducer(undefined, action);
    expect(state).toEqual({
      open: false,
      errors: {}
    });
  });
  it('should handle SHOW_PUBLISH_ERROR action correctly', () => {
    const errors = {
      title: ['Title must be at least 5 characters']
    };
    const action = {
      type: SHOW_PUBLISH_ERROR,
      errors
    };
    const state = articleReducer(undefined, action);
    expect(state).toEqual({
      open: false,
      errors
    });
  });
  it('should handle HIDE_PUBLISH_ERROR action correctly', () => {
    const errors = {
      body: ['Body must be at least 10 characters']
    };
    const currentState = {
      open: false,
      errors
    };
    const action = { type: HIDE_PUBLISH_ERROR };
    const state = articleReducer(currentState, action);
    expect(state).toEqual({
      open: false,
      errors: {}
    });
  });
  it('should handle HIDE_PUBLISH_RESPONSE action correctly', () => {
    const currentState = {
      open: false,
      errors: {},
      response: 'Article has been published successfully!'
    };

    const action = { type: HIDE_PUBLISH_RESPONSE };
    const state = articleReducer(currentState, action);
    expect(state).toEqual({
      open: false,
      errors: {}
    });
  });
  it('should handle SENDING_REQUEST action correctly', () => {
    const currentState = {
      open: false,
      errors: {
        body: ['Body must be at least 10 characters']
      }
    };
    const action = { type: SENDING_REQUEST };
    const state = articleReducer(currentState, action);
    expect(state).toEqual({
      open: false, loading: true, errors: {}
    });
  });
  it('should handle CREATE_ARTICLE_SUCCESS action correctly', () => {
    const currentState = {
      open: true,
      errors: {}
    };
    const responseMsg = 'Article has been published successfully!';
    const action = { type: CREATE_ARTICLE_SUCCESS, response: responseMsg };
    const state = articleReducer(currentState, action);
    expect(state).toEqual({
      open: false,
      errors: {},
      loading: false,
      response: responseMsg
    });
  });
  it('should handle CREATE_ARTICLE_ERROR action correctly', () => {
    const currentState = {
      open: true,
      errors: {}
    };
    const errors = {
      status: 500,
      message: 'An error occured, try again later.'
    };
    const action = { type: CREATE_ARTICLE_ERROR, response: errors };
    const state = articleReducer(currentState, action);
    expect(state).toEqual({
      open: false,
      loading: false,
      errors
    });
  });
});
