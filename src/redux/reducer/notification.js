import { SHOW_NOTIFICATION } from '../actions/notification';

export default function notification(state = { alert: {}, toast: {} }, action = {}) {
  const toast = {};
  const { type, mode, ...payload } = action;
  if (type === SHOW_NOTIFICATION) {
    toast[mode] = { ...payload };
    return { ...state, ...toast };
  }
  return state;
}
