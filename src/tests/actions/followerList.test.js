import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import apiRequest from '../../services/apiRequest';

import {
  FETCH_FOLLOWER_LIST_SUCCESS,
  FETCH_FOLLOWER_LIST_ERROR,
  FETCH_FOLLOWER_LIST_LOADING,
  fetchFollowerListLoading,
  fetchFollowerListFailed,
  fetchFollowerListSucceeded,
  fetchFollowerList
} from '../../redux/actions/users/followerList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should dispatch fetch follower list success action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowerListSucceeded({ myFollowers: [] }));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOWER_LIST_SUCCESS, payload: { myFollowers: [] } };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follower list error action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowerListFailed('An error occurred'));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOWER_LIST_ERROR, payload: 'An error occurred' };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follower list loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchFollowerListLoading(false));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOWER_LIST_LOADING, payload: false };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch follower list action with custom params', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({ data: { myFollowers: [] } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowerList(1, 20));
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOWER_LIST_SUCCESS, payload: { myFollowers: [] } };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follower list error action', async () => {
  const apiReqStub = sinon
    .stub(apiRequest.axios, 'get')
    .rejects({ response: { data: 'An error occurred' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowerList());
  const actions = store.getActions();
  const expectedPayload = { type: FETCH_FOLLOWER_LIST_ERROR, payload: 'An error occurred' };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch follower list connection error action', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects({ request: { data: 'Error' } });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchFollowerList());
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_FOLLOWER_LIST_ERROR,
    payload: 'Could not connect to server. Please check your connection'
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});
