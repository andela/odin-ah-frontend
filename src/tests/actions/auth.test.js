import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import faker from 'faker';
import sinon from 'sinon';
import { registerUser } from '../../redux/actions/auth/register';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export const registrationResult = {
  status: 200,
  data: {
    status: 'success',
    message: 'Please check your Email for account confirmation'
  }

};
export const regrationFailed = {
  response: {
    status: 400,
    data: {
      status: 'success',
      message: 'Please check your Email for account confirmation'
    }
  }
};

async function executeAction(length) {
  const store = mockStore({});
  await store.dispatch(registerUser(user));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

describe('Sign up action test', () => {
  test('should execute register action, simulate registration successful request', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post')
      .resolves(registrationResult);
    await executeAction(4);
    apiReqStub.restore();
  });

  test('should execute register action, simulate registration failed request', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'createUser')
      .rejects(regrationFailed);
    await executeAction(3);
    apiReqStub.restore();
  });

  test('should execute register action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'createUser')
      .rejects({
        request: {
          message: 'Network Error'
        }
      });
    await executeAction(3);
    apiReqStub.restore();
  });
  test('should execute register action, simulate network failed error', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'createUser')
      .rejects({
        message: 'An error occurred'
      });
    await executeAction(3);
    apiReqStub.restore();
  });
});
