import { SHOW_MODAL } from '../actions/modal';

// noinspection JSAnnotator
export default function modal(state = { show: false, content: {} }, action = {}) {
  const { type, ...payload } = action;
  if (type === SHOW_MODAL) {
    return { ...state, ...payload };
  }
  return state;
}
