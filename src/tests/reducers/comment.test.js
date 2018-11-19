import comments from '../../redux/reducer/article/comments';
import { GET_COMMENTS } from '../../redux/actions/articles/comments';

test('default reducer', () => {
  let state = {};
  state = comments(state, {});
  expect(state)
    .toEqual({});
});

test('verify reducer', () => {
  let state = {};
  const payload = {
    to: 'dummy toast',
  };
  state = comments(state, { type: GET_COMMENTS, ...payload });
  expect(state)
    .toEqual(payload);
});
