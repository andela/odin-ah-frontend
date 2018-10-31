import { SHOW_NOTIFICATION } from '../actions/notification';

export default function notification(state = { alert: {}, toast: {} }, action = {}) {
  const toast = {};
  if (action.type === SHOW_NOTIFICATION) {
    toast[action.mode] = { ...action };
    return { ...state, ...toast };
  }
  return state;
}
