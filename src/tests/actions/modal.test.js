import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  dismissModal,
  handleModalDismiss,
  handleRegisterUser,
  handleUserLogin,
  modal,
  openLoginModal,
  openModal,
  openRegistrationModal,
  SHOW_MODAL
} from '../../redux/actions/modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  jest.useFakeTimers();
});

test('should dispatch modal action', () => {
  const show = true;
  const content = {};
  const store = mockStore({});
  store.dispatch(modal(show, content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
  expect(actions[0])
    .toEqual({
      type: SHOW_MODAL,
      show,
      content
    });
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
    .toEqual({
      type: SHOW_MODAL,
      show,
      content
    });
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
    .toEqual({
      type: SHOW_MODAL,
      show,
      content
    });
});

test('should dispatch openModal action', () => {
  const content = {};
  const store = mockStore({});
  store.dispatch(openLoginModal(content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});

test('should dispatch openModal action', () => {
  const content = {};
  const store = mockStore({});
  store.dispatch(openRegistrationModal(content));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});

test('should dispatch openModal action', () => {
  const store = mockStore({});
  handleRegisterUser(store.dispatch)(1000);
  jest.runAllTimers();
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});

test('should dispatch openModal action', () => {
  const store = mockStore({});
  (handleModalDismiss(store.dispatch)(2000));
  jest.runAllTimers();
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});

test('should dispatch openModal action', () => {
  const store = mockStore({});
  (handleUserLogin(store.dispatch)(2000));
  jest.runAllTimers();
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(1);
});
