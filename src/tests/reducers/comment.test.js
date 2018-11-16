import { REDIRECT } from '../../redux/actions/redirect';
import redirectReducer from '../../redux/reducer/redirect';

test('default reducer', () => {
  let state = {};
  state = redirectReducer(state, {});
  expect(state)
    .toEqual({});
});

test('verify reducer', () => {
  let state = {};
  const payload = {
    to: 'dummy toast',
  };
  state = redirectReducer(state, { type: REDIRECT, ...payload });
  expect(state.redirectTo)
    .toEqual(payload);
});
