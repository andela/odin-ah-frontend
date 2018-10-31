import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { alerts, toast, SHOW_NOTIFICATION } from '../../redux/actions/notification';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
test('should dispatch toast action', async () => {
  const show = true;
  const data = {};
  const store = mockStore({});
  await store.dispatch(toast(show, data));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({
      type: SHOW_NOTIFICATION,
      mode: 'toast',
      show,
      data
    });
});
test('should  dispatch alert action', async () => {
  const show = true;
  const data = {};
  const store = mockStore({});
  await store.dispatch(alerts(show, data));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({
      type: SHOW_NOTIFICATION,
      mode: 'alert',
      show,
      data
    });
});
