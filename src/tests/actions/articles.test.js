import moxios from 'moxios';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import apiRequest from '../../services/apiRequest';
import * as actions from '../../redux/actions/articles/articles';
import * as types from '../../redux/constants/articles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const article = {
  title: 'Test title',
  description: 'I am just writing a safety net',
  body: 'I am just writing a safety net',
  tags: ['test']
};

const createSuccessResponse = {
  status: 201,
  data: {
    status: 'success',
    message: 'Article created successfully',
    article
  }
};

const updateSuccessResponse = {
  status: 200,
  data: {
    status: 'success',
    message: 'Article has been updated successfully!',
    article
  }
};

const getArticleSuccessResponse = {
  status: 200,
  data: {
    status: 'success',
    article
  }
};

const errorResponse = {
  status: 500,
  response: {
    status: 'error',
    message: 'Internal server error',
  }
};

const networkError = {
  status: 511,
  message: 'Network Error',
  response: {
    status: 'error',
  }
};

const getArticleByTagsSuccess = {
  status: 200,
  response: {
    status: 'success',
    message: 'Article has been retrieved successfully!',
    data: {
      articles: [
        {
          slug: 'my-recent-learning-journey-bggLag6B',
          title: 'My Recent Learning Journey',
          body: 'Body here'
        }
      ],
    }
  }
};

const getArticlesByTagError = {
  status: 500,
  response: {
    status: 'error',
    message: 'Internal server error',
  }
};

describe('Article actions', () => {
  const axiosInstance = apiRequest.getInstance();
  beforeEach(() => {
    store.clearActions();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  describe('openPublishModal', () => {
    it('should dispatch the OPEN_PUBLISH_MODAL action type', () => {
      store.dispatch(actions.openPublishModal());
      const action = store.getActions();
      expect(action[0]).toEqual({ type: types.OPEN_PUBLISH_MODAL });
      expect(action).toMatchSnapshot();
    });
  });
  describe('closePublishModal', () => {
    it('should dispatch the CLOSE_PUBLISH_MODAL action type', () => {
      store.dispatch(actions.closePublishModal());
      const action = store.getActions();
      expect(action[0]).toEqual({ type: types.CLOSE_PUBLISH_MODAL });
      expect(action).toMatchSnapshot();
    });
  });
  describe('showCreateError', () => {
    const errors = {
      title: ['Title must be at least 5 characters']
    };
    it('should dispatch the SHOW_PUBLISH_ERROR action type', () => {
      store.dispatch(actions.showCreateError(errors));
      const action = store.getActions();
      expect(action[0]).toEqual({ type: types.SHOW_PUBLISH_ERROR, errors });
      expect(action).toMatchSnapshot();
    });
  });
  describe('hideCreateError', () => {
    it('should dispatch the HIDE_PUBLISH_ERROR action type', () => {
      store.dispatch(actions.hideCreateError());
      const action = store.getActions();
      expect(action[0]).toEqual({ type: types.HIDE_PUBLISH_ERROR });
      expect(action).toMatchSnapshot();
    });
  });
  describe('hideCreateResponse', () => {
    it('should dispatch the HIDE_PUBLISH_RESPONSE action type', () => {
      store.dispatch(actions.hideCreateResponse());
      const action = store.getActions();
      expect(action[0]).toEqual({ type: types.HIDE_PUBLISH_RESPONSE });
      expect(action).toMatchSnapshot();
    });
  });
  describe('createArticleRequest', () => {
    it('should dispatch the 2 correct actions', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(createSuccessResponse);
      });
      return store.dispatch(actions.createArticleRequest(article)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    it('should dispatch the 2 correct error action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(errorResponse);
      });
      return store.dispatch(actions.createArticleRequest(article)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });

  describe('updateArticleRequest', () => {
    const slug = 'test-article-334u4';
    it('should dispatch the 2 correct actions', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(updateSuccessResponse);
      });
      return store.dispatch(actions.updateArticleRequest(slug, article)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    it('should dispatch the correct error action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(errorResponse);
      });
      return store.dispatch(actions.updateArticleRequest(slug, article)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });

  describe('getArticleForUpdate', () => {
    const slug = 'test-article-334u4';
    it('should dispatch the 2 correct actions', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(getArticleSuccessResponse);
      });
      return store.dispatch(actions.getArticle(slug)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    it('should dispatch the correct error action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(errorResponse);
      });
      return store.dispatch(actions.getArticle(slug)).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });

  async function executeAction(length) {
    await store.dispatch(actions.deleteArticle('url'));
    const action = store.getActions();
    expect(action.length)
      .toEqual(length);
  }
  describe('Comment action test', () => {
    test('should execute getComment action, simulate successful request', async () => {
      const apiReqStub = sinon.stub(apiRequest.axios, 'delete')
        .resolves();
      await executeAction(2);
      apiReqStub.restore();
    });
  });

  describe('getArticlesByTag', () => {
    it('should dispatch the actions LOADING_ARTICLES_BY_TAG and GET_ARTICLES_BY_TAG', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(getArticleByTagsSuccess);
      });
      return store.dispatch(actions.getArticlesByTag('Career')).then(() => {
        const action = store.getActions();
        expect(action.length).toBe(2);
        expect(action[0]).toEqual({ type: types.LOADING_ARTICLES_BY_TAG });
        expect(action[1]).toEqual({
          type: types.GET_ARTICLES_BY_TAG,
          response: getArticleByTagsSuccess.response.data
        });
      });
    });

    it('should dispatch the actions LOADING_ARTICLES_BY_TAG and ARTICLES_BY_TAG_ERROR', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(getArticlesByTagError);
      });
      return store.dispatch(actions.getArticlesByTag('Android')).then(() => {
        const action = store.getActions();
        expect(action.length).toBe(2);
        expect(action[0]).toEqual({ type: types.LOADING_ARTICLES_BY_TAG });
        expect(action[1]).toEqual({
          type: types.ARTICLES_BY_TAG_ERROR,
          errors: { ...getArticlesByTagError.response }
        });
      });
    });

    it('should dispatch the actions LOADING_ARTICLES_BY_TAG and ARTICLES_BY_TAG_ERROR', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(networkError);
      });
      return store.dispatch(actions.getArticlesByTag('Carrer')).then(() => {
        const action = store.getActions();
        expect(action.length).toBe(2);
        expect(action[0]).toEqual({ type: types.LOADING_ARTICLES_BY_TAG });
        expect(action[1]).toEqual({
          type: types.ARTICLES_BY_TAG_ERROR,
          errors: { message: 'Could not connect to server. Please check your connection' }
        });
      });
    });
  });
});
