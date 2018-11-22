import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import apiRequest from '../../services/apiRequest';

import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  UPDATE_FOLLOW_LIST_LOADED,
  UPDATE_FOLLOW_LIST_ERROR,
  UPDATE_FOLLOW_LIST_LOADING,
  fetchFollowListLoading,
  fetchFollowListFailed,
  fetchFollowListSucceeded,
  fetchFollowList,
  updateFollowListLoaded,
  updateFollowListLoading,
  updateFollowListFailed,
  updateFollowList
} from '../../redux/actions/users/followList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should dispatch fetch follow list success action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowListSucceeded({ usersIFollow: [] }));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_SUCCESS, payload: { usersIFollow: [] } };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follow list error action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowListFailed('An error occurred'));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_ERROR, payload: 'An error occurred' };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follow list loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowListLoading(false));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_LOADING, payload: false };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follow list action with default size', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { usersIFollow: [] } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowList());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_SUCCESS, payload: { usersIFollow: [] } };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follow list action with custom size', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { usersIFollow: [] } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowList(20));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_SUCCESS, payload: { usersIFollow: [] } };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follow list error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ response: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowList());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOW_LIST_ERROR, payload: 'An error occurred' };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follow list connection error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects({ request: { data: 'Error' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowList());
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_FOLLOW_LIST_ERROR,
    payload: 'Could not connect to server. Please check your connection'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follow list other error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects();
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowList());
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_FOLLOW_LIST_ERROR,
    payload: 'An error occurred. Please try again'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch update follow list loaded action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(updateFollowListLoaded(1, true));
  const actions = store.getActions();
  const expectedPayload = { type: UPDATE_FOLLOW_LIST_LOADED, payload: { userId: 1, status: true } };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch update follow list loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(updateFollowListLoading(1, true));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_LOADING,
    payload: { userId: 1, status: true }
  };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch update follow list failed action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(updateFollowListFailed('An error occurred', 1));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_ERROR,
    payload: { error: 'An error occurred', userId: 1 }
  };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch update list action with unfollow user', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').resolves({});
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(updateFollowList(1, true));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_LOADED,
    payload: { userId: 1, status: true }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch update list action with follow user', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'post').resolves({});
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(updateFollowList(1, false));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_LOADED,
    payload: { userId: 1, status: false }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch update follow list error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'post')
    .rejects({ response: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(updateFollowList(1, false));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_ERROR,
    payload: { error: 'An error occurred', userId: 1 }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch update follow list connection error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'post')
    .rejects({ request: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(updateFollowList(1, false));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_ERROR,
    payload: { error: 'Could not connect to server. Please check your connection', userId: 1 }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch update follow list other error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'delete').rejects();
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(updateFollowList(1, true));
  const actions = store.getActions();
  const expectedPayload = {
    type: UPDATE_FOLLOW_LIST_ERROR,
    payload: { error: 'An error occurred. Please try again', userId: 1 }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});
