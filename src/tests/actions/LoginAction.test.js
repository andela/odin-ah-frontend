import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import faker from 'faker';
import sinon from 'sinon';
import {
  userLoginRequest,
  logout,
  loginUser,
  getAuthUserProfile
} from '../../redux/actions/auth/login';
import apiRequest from '../../services/apiRequest';
import * as types from '../../redux/constants/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const userData = {
  email: faker.internet.email(),
  password: faker.internet.password()
};
const profile = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  firstName: 'Hameedah',
  lastName: 'Okoro',
  bio: faker.lorem.sentences(),
  imageUrl: faker.image.imageUrl(),
  settings: {
    articleLike: true,
    newFollower: true,
    emailSubcribe: true,
    articleComment: true,
    newArticleFromUserFollowing: true,
    newFollowerOnSeries: true
  }
};
export const loginResult = {
  status: 200,
  data: {
    user: {
      email: faker.internet.email(),
      token: 'token',
      username: faker.internet.userName(),
      bio: faker.lorem.sentences(),
      imageUrl: faker.image.imageUrl()
    }
  }
};
export const loginFailed = {
  response: {
    status: 'error',
    message: 'Invalid user credentials'
  }
};
export const socialLoginFailed = {
  message: 'Your social account does not have an email associated. Please sign up with email'
};

export const networkError = {
  response: {
    status: 500,
    data: {
      status: 'error',
      message: 'Network error'
    }
  }
};

async function executeAction(length) {
  const store = mockStore({});
  await store.dispatch(userLoginRequest(userData));
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}

async function dispatchAction(length) {
  const store = mockStore({});
  await store.dispatch(loginUser(profile));
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}
async function executeProfileAction(length) {
  const store = mockStore({});
  await store.dispatch(getAuthUserProfile());
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}
describe('log in action test', () => {
  it('should execute log in action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post').resolves(loginResult);
    await executeAction(2);
    apiReqStub.restore();
  });
  it('should execute log in action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post').resolves(profile);
    await dispatchAction(1);
    apiReqStub.restore();
  });

  it('should not execute log in action', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'loginUser').rejects(loginFailed);
    await executeAction(1);
    apiReqStub.restore();
  });
  it('should execute log in action for social', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'authenticateUser').resolves({
      data: {
        profile
      }
    });
    await executeProfileAction(1);
    apiReqStub.restore();
  });
  it('should not execute log in action for social', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'authenticateUser').rejects(socialLoginFailed);
    await executeProfileAction(0);
    apiReqStub.restore();
  });
  test('should execute login action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'loginUser').rejects(networkError);
    await executeAction(1);
    apiReqStub.restore();
  });
  test('should execute login action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'loginUser').rejects(networkError);
    await executeAction(1);
    apiReqStub.restore();
  });
});

describe('log out action test', () => {
  it('should dispatch logout action', () => {
    const store = mockStore({});

    const expectedAction = [
      {
        type: types.LOGOUT_USER
      }
    ];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
