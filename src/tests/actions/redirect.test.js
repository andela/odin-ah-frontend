import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { clearRedirect, redirect, redirectToReferrer } from '../../redux/actions/redirect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('should execute redirect action, simulate successful request', async () => {
  const store = mockStore({});
  await store.dispatch(redirect('url'));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});
test('should execute redirect action, simulate successful request', async () => {
  const store = mockStore({});
  await store.dispatch(redirectToReferrer('url'));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});
test('should execute redirect action, simulate successful request', async () => {
  const store = mockStore({});
  await store.dispatch(clearRedirect());
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});
