import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import apiRequest from '../../services/apiRequest';

import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING,
  FETCH_ARTICLES_FROM_STORE,
  INVALID_ACTION,
  fetchArticlesSucceeded,
  fetchArticlesFailed,
  fetchArticlePage,
  fetchArticlesFromStore,
  fetchArticles,
  fetchArticlesStarted
} from '../../redux/actions/landingPage/articles';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should dispatch fetch success action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchArticlesSucceeded({ articles: [] }));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_SUCCESS, payload: { articles: [] } };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch error action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchArticlesFailed('An error occurred'));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_ERROR, payload: 'An error occurred' };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchArticlesStarted());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_LOADING };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch from store action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchArticlesFromStore(2, 5));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_FROM_STORE, size: 5, pageToLoad: 2 };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch articles action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchArticles(1, 5));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_SUCCESS, payload: { articles: [] } };
  expect(actions[1]).toEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch articles error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ response: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchArticles(1, 5));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_ERROR, payload: 'An error occurred' };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch articles connection error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ request: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchArticles(1, 5));
  const actions = store.getActions();
  const expectedPayload = {
    data: { text: 'Could not connect to server. Please check your connection', type: 'error' },
    mode: 'alert',
    show: true,
    type: 'SHOW_NOTIFICATION'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch articles other error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects();
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchArticles(1, 5));
  const actions = store.getActions();
  const expectedPayload = {
    data: { text: 'An error occurred. Please try again', type: 'error' },
    mode: 'alert',
    show: true,
    type: 'SHOW_NOTIFICATION'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch article page action with bad argument', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    landingPageArticles: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(0));
  const actions = store.getActions();
  const expectedPayload = { type: INVALID_ACTION };
  expect(actions).toEqual([expectedPayload]);
  apiReqStub.restore();
});

it('should dispatch fetch next article page action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    landingPageArticles: {
      currentPage: 1,
      size: 10,
      pagesFetched: 1,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(1));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_SUCCESS, payload: { articles: [] } };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch previous article page action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    landingPageArticles: {
      currentPage: 2,
      size: 10,
      pagesFetched: 2,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(-1));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_ARTICLES_FROM_STORE, size: 10, pageToLoad: 1 };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch invalid action when previous page is 0', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    landingPageArticles: {
      currentPage: 1,
      size: 10,
      pagesFetched: 2,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(-1));
  const actions = store.getActions();
  const expectedPayload = { type: INVALID_ACTION };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch invalid action when params are contrived', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { articles: [] } });
  const initialState = {
    landingPageArticles: {
      currentPage: 1,
      size: 10,
      pagesFetched: 4,
      totalPages: 3
    }
  };
  const store = mockStore(initialState);
  await store.dispatch(fetchArticlePage(1));
  const actions = store.getActions();
  const expectedPayload = { type: INVALID_ACTION };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});
