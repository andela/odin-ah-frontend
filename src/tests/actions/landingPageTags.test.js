import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import apiRequest from '../../services/apiRequest';

import {
  FETCH_PTAGS_SUCCESS,
  FETCH_PTAGS_ERROR,
  FETCH_PTAGS_LOADING,
  fetchPtagsStarted,
  fetchPtagsFailed,
  fetchPtagsSucceeded,
  fetchPtags
} from '../../redux/actions/landingPage/tags';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should dispatch fetch success action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchPtagsSucceeded({ tags: [] }));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_PTAGS_SUCCESS, payload: { tags: [] } };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch error action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchPtagsFailed('An error occurred'));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_PTAGS_ERROR, payload: 'An error occurred' };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchPtagsStarted());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_PTAGS_LOADING };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch tags action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { tags: [] } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchPtags());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_PTAGS_SUCCESS, payload: { tags: [] } };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch tags error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ response: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchPtags());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_PTAGS_ERROR, payload: 'An error occurred' };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch tags connection error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ request: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchPtags());
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_PTAGS_ERROR,
    payload: 'Could not connect to server. Please check your connection'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch tags other error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects();
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchPtags());
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_PTAGS_ERROR,
    payload: 'An error occurred. Please try again'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});
