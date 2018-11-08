import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  modal, openModal, dismissModal, SHOW_MODAL
} from '../../redux/actions/modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('should dispatch modal action', () => {
  const show = true;
  const content = {};
  const store = mockStore({});
  store.dispatch(modal(show, content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({ type: SHOW_MODAL, show, content });
});

test('should dispatch dismissModal action', () => {
  const show = false;
  const content = {};
  const store = mockStore({});
  store.dispatch(dismissModal());
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({ type: SHOW_MODAL, show, content });
});

test('should dispatch openModal action', () => {
  const show = true;
  const content = {};
  const store = mockStore({});
  store.dispatch(openModal(content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({ type: SHOW_MODAL, show, content });
});
