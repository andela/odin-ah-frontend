import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { redirect } from '../../redux/actions/redirect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

export const commentResult = {
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
  await store.dispatch(redirect('url'));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}
test('should execute getComment action, simulate successful request', async () => {
  await executeAction(1);
});
