import { SHOW_NOTIFICATION } from '../../redux/actions/notification';
import notification from '../../redux/reducer/notification';

test('default reducer', () => {
  let state = {};
  state = notification(state, {});
  expect(state)
    .toEqual({});
});

test('toast reducer', () => {
  let state = {};
  const action = {
    type: SHOW_NOTIFICATION,
    show: true,
    mode: 'alert',
    data: {
      type: 'success',
      text: 'dummy toast',
    }
  };
  state = notification(state, action);
  expect(state.alert.show)
    .toEqual(action.show);
  expect(state.alert.data)
    .toEqual(action.data);
  action.data = {
    type: 'failed',
    text: 'error',
  };
  state = notification(state, action);
  expect(state.alert.show)
    .toEqual(action.show);
  expect(state.alert.data)
    .toEqual(action.data);
});
