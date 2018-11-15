import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import faker from 'faker';
import sinon from 'sinon';
import { verifyToken, resendVerificationLink } from '../../redux/actions/auth/verify';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export const resendLinkResult = {
  status: 200,
  data: {
    status: 'success',
    message: 'Please check your Email for account confirmation'
  }

};
export const requestFailed = {
  response: {
    status: 400,
    data: {
      status: 'success',
      message: 'Please check your Email for account confirmation'
    }
  }
};

async function executeVerifyTokenAction(length) {
  const store = mockStore({});
  await store.dispatch(verifyToken('token'));
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}
async function executeResendVerificationLinkAction(length) {
  const store = mockStore({});
  await store.dispatch(resendVerificationLink(user.email));
  const actions = store.getActions();
  expect(actions.length).toEqual(length);
}

describe('Verification action test', () => {
  let apiReqStub;
  test('should execute verifyToken action, simulate registration successful request',
    async () => {
      apiReqStub = sinon.stub(apiRequest.axios, 'get')
        .resolves(resendLinkResult);
      await executeVerifyTokenAction(4);
      apiReqStub.restore();
    });
  test('should execute verifyToken action, simulate verification failed request', async () => {
    apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .rejects(requestFailed);
    await executeVerifyTokenAction(4);
    apiReqStub.restore();
  });
  test('should execute verifyToken action, simulate network failed error', async () => {
    apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .rejects({
        request: {
          message: 'Network Error'
        }
      });
    await executeVerifyTokenAction(3);
    apiReqStub.restore();
  });
  test('should execute verifyToken action, simulate network failed error', async () => {
    apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .rejects({
        message: 'An error occurred'
      });
    await executeVerifyTokenAction(3);
    apiReqStub.restore();
  });
});

describe('Resend Verification Link action test', () => {
  let apiReqStub;
  test('should execute resendVerificationLink action, simulate registration successful request',
    async () => {
      apiReqStub = sinon.stub(apiRequest.axios, 'post')
        .resolves(resendLinkResult);
      await executeResendVerificationLinkAction(3);
      apiReqStub.restore();
    });
  test('should execute resendVerificationLink action, simulate verification failed request',
    async () => {
      apiReqStub = sinon.stub(apiRequest.axios, 'post')
        .rejects(requestFailed);
      await executeResendVerificationLinkAction(3);
      apiReqStub.restore();
    });
  test('should execute resendVerificationLink action, simulate network failed error',
    async () => {
      apiReqStub = sinon.stub(apiRequest.axios, 'post')
        .rejects({
          request: {
            message: 'Network Error'
          }
        });
      await executeResendVerificationLinkAction(3);
      apiReqStub.restore();
    });
  test('should execute resendVerificationLink action, simulate network failed error',
    async () => {
      apiReqStub = sinon.stub(apiRequest.axios, 'post')
        .rejects({
          message: 'An error occurred'
        });
      await executeResendVerificationLinkAction(3);
      apiReqStub.restore();
    });
});
