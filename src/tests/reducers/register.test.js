import { REGISTRATION_SUCCESSFUL } from '../../redux/actions/auth/register';
import registration from '../../redux/reducer/auth/register';

test('default reducer', () => {
  let state = {};
  state = registration(state, {});
  expect(state)
    .toEqual({});
});

test('register reducer', () => {
  let state = {};
  const action = {
    type: REGISTRATION_SUCCESSFUL,
    show: true,
    data: {
      type: 'success',
      text: 'dummy toast',
    }
  };
  state = registration(state, action);
  expect(state.show)
    .toEqual(action.show);
  expect(state.data)
    .toEqual(action.data);
  action.data = {
    type: 'failed',
    text: 'error',
  };
  state = registration(state, action);
  expect(state.show)
    .toEqual(action.show);
  expect(state.data)
    .toEqual(action.data);
});
