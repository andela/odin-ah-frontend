import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import apiRequest from '../../services/apiRequest';
import * as actions from '../../redux/actions/comment/comment';
import * as types from '../../redux/constants/comment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const slug = 'my-test-article';
const commentPayload = {
  slug,
  comment: {
    body: 'I like this article'
  }
};
const createSuccessResponse = {
  status: 201,
  response: {
    comment: {
      status: 'success',
      message: 'Successfully created comment',
      comment: {
        body: 'I like this article'
      }
    }
  }
};
const createErrorResponse = {
  status: 500,
  response: {
    status: 'error',
    message: 'Internal server error',
  }
};

const networkErrorResponse = {
  status: 511,
  message: 'Network Error',
  response: {
    status: 'error'
  }
};

const getCommentSuccessResponse = {
  status: 200,
  response: {
    data: {
      status: 'success',
      message: 'Successfully retrieved comments',
      comments: []
    }
  }
};

describe('Comment actions', () => {
  const axiosInstance = apiRequest.getInstance();
  beforeEach(() => {
    store.clearActions();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it('should dispatch 3 valid actions on postComment success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(createSuccessResponse);
    });
    return store.dispatch(actions.sendComment(commentPayload)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(3);
      expect(action[0]).toEqual({ type: types.SENDING_COMMENT });
    });
  });
  it('should dispatch 3 valid actions on postComment error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(createErrorResponse);
    });
    return store.dispatch(actions.sendComment(commentPayload)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(3);
      expect(action[0]).toEqual({ type: types.SENDING_COMMENT });
      expect(action[2]).toEqual({
        type: types.SHOW_COMMENT_ERROR,
        errors: [createErrorResponse.response.message]
      });
    });
  });
  it('should dispatch 3 valid actions on getComments success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(getCommentSuccessResponse);
    });
    return store.dispatch(actions.getComments(slug, 1)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(2);
      expect(action[0]).toEqual({ type: types.LOADING_COMMENTS });
      expect(action[1]).toEqual({
        type: types.SHOW_ARTICLE_COMMENTS,
        comments: []
      });
    });
  });
  it('should dispatch 3 valid actions on postComment Network error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(networkErrorResponse);
    });
    return store.dispatch(actions.sendComment(commentPayload)).then(() => {
      const action = store.getActions();
      expect(action.length).toBe(3);
      expect(action[0]).toEqual({ type: types.SENDING_COMMENT });
      expect(action[2]).toEqual({
        type: types.SHOW_COMMENT_ERROR,
        errors: ['Unable to connect to the internet']
      });
    });
  });
});
