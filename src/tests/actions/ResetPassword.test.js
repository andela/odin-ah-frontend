import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import {
  completeResetRequest,
  resetRequestHandler,
  saveInput,
  saveInputHandler
} from '../../redux/actions/resetPassword';
import apiRequest from '../../services/apiRequest';
import { INPUT_ERROR, SAVE_INPUT } from '../../redux/constants/resetPassword';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('should save user input', () => {
  const expectedActions = [
    {
      type: 'SAVE_INPUT',
      payload: { field: 'email', value: 'hboy@gmail.com' }
    }
  ];
  const store = mockStore({});
  store.dispatch(saveInput('email', 'hboy@gmail.com'));
  const actions = store.getActions();
  expect(actions.length).toEqual(1);
  expect(actions).toEqual(expectedActions);
});
test('Reset password request', async () => {
  const stubAxiosPost = sinon.stub(apiRequest.axios, 'post').resolves({
    data: {
      message: 'done'
    }
  });
  const expectedActions = [
    {
      type: 'PASSWORD_RESET_INPUT_ERROR',
      payload: { errors: undefined }
    },
    {
      type: 'PASSWORD_RESET_REQUEST',
      payload: {
        data: 'email@email.com',
        loading: true
      }
    },
    {
      type: 'SHOW_NOTIFICATION',
      data: { type: 'success', text: 'done' },
      show: true,
      mode: 'alert'
    },
    {
      type: 'PASSWORD_RESET_REQUEST_SUCCESS',
      payload: { message: 'done', loading: false }
    }
  ];

  const store = mockStore({});
  await store.dispatch(resetRequestHandler('email@email.com'));
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);
  stubAxiosPost.restore();
});

test('Reset password request fail test', async () => {
  const stubAxiosPost = sinon.stub(apiRequest.axios, 'post').resolves({
    data: {
      message: 'done'
    }
  });
  const expectedActions = [
    {
      type: 'PASSWORD_RESET_INPUT_ERROR',
      payload: { errors: undefined }
    },
    {
      type: 'COMPLETE_PASSWORD_RESET_REQUEST',
      payload: { data: { password: 'password', confirmPassword: 'password' } }
    },
    {
      type: 'SHOW_NOTIFICATION',
      data: { type: 'success', text: 'done' },
      show: true,
      mode: 'alert'
    },
    {
      type: 'COMPLETE_PASSWORD_RESET_REQUEST_SUCCESS',
      payload: { message: undefined }
    }
  ];
  const store = mockStore({});
  await store.dispatch(completeResetRequest({ password: 'password', confirmPassword: 'password' }));
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);

  stubAxiosPost.restore();
});

test('Reset password request fail test', async () => {
  const stubAxiosPost = sinon.stub(apiRequest.axios, 'post').resolves({
    data: {
      message: 'done'
    }
  });
  const field = 'password';
  const value = 'password';
  const expectedActions = [
    {
      type: INPUT_ERROR,
      payload: {
        errors: null,
      }
    },
    {
      type: SAVE_INPUT,
      payload: {
        field,
        value
      }
    }
  ];
  const store = mockStore({});
  await store.dispatch(saveInputHandler(field, value));
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);

  stubAxiosPost.restore();
});
