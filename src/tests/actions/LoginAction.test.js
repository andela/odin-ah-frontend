import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import faker from 'faker';
import sinon from 'sinon';
import {
  getAuthUserProfile,
  loginUser,
  logout,
  userLoginRequest
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
    data: {
      status: 'error',
      message: 'Invalid user credentials'
    }
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
export const networkError1 = {
  response: {
    status: 403,
    response: {
      status: 'error',
      message: 'Network error'
    }
  }
};

async function executeAction(action, length) {
  const store = mockStore({});
  await store.dispatch(action(userData));
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}

async function executeUserLoginRequestAction(length) {
  await executeAction(userLoginRequest, length);
}

async function executeLoginUserAction(length) {
  await executeAction(loginUser, length);
}

async function executeGetAuthUserProfileAction(length) {
  await executeAction(getAuthUserProfile, length);
}

describe('log in action test', () => {
  it('should not execute log in action for social', async () => {
    const apiReqStub = sinon
      .stub(apiRequest.axios, 'get')
      .rejects(socialLoginFailed);
    await executeGetAuthUserProfileAction(0);
    apiReqStub.restore();
  });
  it('should execute userLoginRequest action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .resolves(loginResult);
    await executeUserLoginRequestAction(2);
    apiReqStub.restore();
  });
  it('should execute loginUser action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .resolves(profile);
    await executeLoginUserAction(1);
    apiReqStub.restore();
  });

  it('should not execute log in action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post').rejects(loginFailed);
    await executeUserLoginRequestAction(1);
    apiReqStub.restore();
  });

  test('should execute login action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .rejects(networkError);
    await executeUserLoginRequestAction(1);
    apiReqStub.restore();
  });
  test('should execute login action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .rejects(networkError);
    await executeUserLoginRequestAction(1);
    apiReqStub.restore();
  });
  test('should execute login action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .rejects(networkError1);
    await executeUserLoginRequestAction(1);
    apiReqStub.restore();
  });

  it('should execute log in action', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .resolves({ status: 200, data: { profile } });
    await executeGetAuthUserProfileAction(1);
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
    expect(store.getActions())
      .toEqual(expectedAction);
  });
});
