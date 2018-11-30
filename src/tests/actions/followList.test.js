import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import apiRequest from '../../services/apiRequest';

import {
  FETCH_FOLLOW_LIST_SUCCESS,
  FETCH_FOLLOW_LIST_ERROR,
  FETCH_FOLLOW_LIST_LOADING,
  fetchFollowListLoading,
  fetchFollowListFailed,
  fetchFollowListSucceeded,
  fetchFollowList,
  fetchSingleFollowLoading,
  FETCH_SINGLE_FOLLOW_LOADING,
  fetchSingleFollowSuccess,
  FETCH_SINGLE_FOLLOW_SUCCESS,
  fetchSingleFollowFailed,
  FETCH_SINGLE_FOLLOW_ERROR,
  syncFollowList,
  SYNC_FOLLOW_LIST,
  updateFollowList,
  fetchSingleFollow
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

it('should dispatch fetch single follow loading action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchSingleFollowLoading(1));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_LOADING,
    payload: {
      done: false, status: false, authorId: 1, error: false
    }
  };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch single follow success action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchSingleFollowSuccess(1, true));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      done: true, status: true, authorId: 1, error: false
    }
  };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch fetch single follow error action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(fetchSingleFollowFailed(1, true));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_ERROR,
    payload: {
      done: true, status: true, authorId: 1, error: true
    }
  };
  expect(actions).toEqual([expectedPayload]);
});

it('should dispatch sync follow list action', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(syncFollowList());
  const actions = store.getActions();
  const expectedPayload = {
    type: SYNC_FOLLOW_LIST
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
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      done: true, status: false, authorId: 1, error: false
    }
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
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      done: true, status: true, authorId: 1, error: false
    }
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
    type: FETCH_SINGLE_FOLLOW_ERROR,
    payload: {
      done: true, status: false, authorId: 1, error: true
    }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch single follow action with non following', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({
    data: {
      data: { usersIFollow: [] }
    }
  });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchSingleFollow(1));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      done: true, status: false, authorId: 1, error: false
    }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch single follow action with following', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves({
    data: {
      data: { usersIFollow: ['user'] }
    }
  });
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchSingleFollow(1));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_SUCCESS,
    payload: {
      done: true, status: true, authorId: 1, error: false
    }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});

it('should dispatch fetch single follow error on request error', async () => {
  const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects();
  const initialState = {};
  const store = mockStore(initialState);
  await store.dispatch(fetchSingleFollow(1));
  const actions = store.getActions();
  const expectedPayload = {
    type: FETCH_SINGLE_FOLLOW_ERROR,
    payload: {
      done: true, status: false, authorId: 1, error: true
    }
  };
  expect(actions).toContainEqual(expectedPayload);
  apiReqStub.restore();
});
