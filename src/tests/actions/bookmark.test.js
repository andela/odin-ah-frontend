import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as ActionType from '../../redux/constants/articles';
import { bookMarkArticle } from '../../redux/actions/articles/articles';
import {
  fetchBookmarkBegin, fetchBookmarkSuccess, fetchBookmarkFailure, removeBookmarkBegin,
  removeBookmarkSuccess, removeBookmarkFailure,
  invalidAction, fetchArticlesFromStore, fetchBookmarkArticle, fetchArticlePage,
  removeBookmarkArticle
} from '../../redux/actions/articles/bookmark';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const { slug } = 'demo-title-wjI1VLG6';

async function dispatchAction(length) {
  const store = mockStore({});
  await store.dispatch(bookMarkArticle(slug));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

describe('Profile data action test', () => {
  it('creates BOOKMARK_ARTICLE_BEGINS and  FBOOKMARK_ARTICLE_FAILURE  actions', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'bookMarkArticle')
      .rejects({
        request: {
          message: 'Network Error'
        }
      });
    await dispatchAction(2);
    apiReqStub.restore();
  });

  it('creates BOOKMARK_ARTICLE_BEGINS and  FBOOKMARK_ARTICLE_SUCCESS  actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post');
    await dispatchAction(2);
    apiReqStub.restore();
  });
});

it('should dispatch fetch loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchBookmarkBegin());
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.FETCH_BOOKMARK_ARTICLE_BEGIN };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetchBookmarkSuccess action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({});
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchBookmarkSuccess());
  apiReqStub.restore();
});

it('should dispatch fetchBookmarkFailure action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ error: 'error' });
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchBookmarkFailure(apiReqStub));
  apiReqStub.restore();
});

it('should dispatch fetch loading action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').resolves({});
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(removeBookmarkBegin(apiReqStub));
  apiReqStub.restore();
});

it('should dispatch removeBookmarkSuccess action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').resolves({});
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(removeBookmarkSuccess(apiReqStub));
  apiReqStub.restore();
});

it('should dispatch removeBookmarkFailure action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').resolves({ error: 'error' });
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(removeBookmarkFailure(apiReqStub));
  apiReqStub.restore();
});

it('should dispatch fetch loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(invalidAction());
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.INVALID_ACTION };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch loading action', () => {
  const initialState = {
    landingPageArticles: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  store.dispatch(fetchArticlesFromStore());
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.FETCH_ARTICLES_FROM_STORE };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch next article page action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(1));
  apiReqStub.restore();
});

it('should dispatch fetchBookmarkArticle action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  store.dispatch(fetchBookmarkArticle());
  apiReqStub.restore();
});

it('should dispatch FETCH_BOOKMARK_ARTICLE_FAILURE', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects({ data: { message: {}, type: 'FETCH_BOOKMARK_ARTICLE_FAILURE' } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  store.dispatch(fetchBookmarkArticle());
  apiReqStub.restore();
});

it('should dispatch removeBookmarkArticle action', () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  store.dispatch(removeBookmarkArticle(slug));
  apiReqStub.restore();
});

it('should dispatch fetch previous article page action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 2,
      size: 10,
      pagesFetched: 2,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(-1));
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.FETCH_ARTICLES_FROM_STORE, size: 10, pageToLoad: 1 };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch invalid action when params are contrived', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 4,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(1));
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.INVALID_ACTION };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch invalid action when previous page is 0', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 2,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(-1));
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.INVALID_ACTION };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch article page action with bad argument', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(0));
  const actions = store.getActions();
  const expectedPayload = { type: ActionType.INVALID_ACTION };
  expect(actions).toEqual([expectedPayload]);
  apiReqStub.restore();
});

it('should dispatch fetch article page action with bad argument', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').rejects({ data: { message: {}, type: 'REMOVE_BOOKMARK_ARTICLE_FAILURE' } });
  const initialState = {
    bookmark: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(removeBookmarkArticle());
  apiReqStub.restore();
});
