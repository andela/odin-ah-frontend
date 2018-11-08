import { VERIFICATION } from '../../redux/actions/auth/verify';
import verify from '../../redux/reducer/auth/verify';

test('default reducer', () => {
  let state = {};
  state = verify(state, {});
  expect(state)
    .toEqual({});
});

test('verify reducer', () => {
  let state = {};
  const action = {
    type: VERIFICATION,
    show: true,
    data: {
      type: 'success',
      text: 'dummy toast',
    }
  };
  state = verify(state, action);
  expect(state.show)
    .toEqual(action.show);
  expect(state.data)
    .toEqual(action.data);
  action.data = {
    type: 'failed',
    text: 'error',
  };
  state = verify(state, action);
  expect(state.show)
    .toEqual(action.show);
  expect(state.data)
    .toEqual(action.data);
});
