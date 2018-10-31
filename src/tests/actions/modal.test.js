import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { modal, SHOW_MODAL } from '../../redux/actions/modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
test('should  dispatch modal action', async () => {
  const show = true;
  const content = {};
  const store = mockStore({});
  await store.dispatch(modal(show, content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({ type: SHOW_MODAL, show, content });
});
