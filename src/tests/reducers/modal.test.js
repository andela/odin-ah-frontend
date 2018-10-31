import modal from '../../redux/reducer/modal';
import { SHOW_MODAL } from '../../redux/actions/modal';

test('default reducer', () => {
  let state = {};

  state = modal(state, {});
  expect(state).toEqual({});

  state = modal();
  expect(state).toEqual({ show: false, content: {} });

  const payload = { show: true, content: { Component: 'a react component', props: {} } };
  const action = { type: SHOW_MODAL, ...payload };
  state = modal(state, action);
  expect(state).toEqual(payload);
});
