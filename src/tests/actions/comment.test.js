import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import apiRequest from '../../services/apiRequest';
import { getComments } from '../../redux/actions/articles/comments';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

export const commentResult = {
  status: 200,
  data: {
    data: {
      comments: {},
    },
    status: 'success',
    message: 'Please check your Email for account confirmation'
  }

};
export const deleteError = {
  response: {
    status: 400,
    data: {
      status: 'success',
      message: 'Please check your Email for account confirmation'
    }
  }
};

async function executeAction(id, length) {
  const store = mockStore({});
  await store.dispatch(getComments('url', id));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

describe('Comment action test', () => {
  test('should execute getComment action, simulate successful request', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .resolves(commentResult);
    await executeAction(2, 2);
    await executeAction(null, 2);
    apiReqStub.restore();
  });

  test('should execute register action, simulate registration failed request', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get')
      .rejects(deleteError);
    await executeAction(null, 2);
    apiReqStub.restore();
  });
});
