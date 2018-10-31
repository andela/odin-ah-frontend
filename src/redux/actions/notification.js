export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';


function action(show, data, mode) {
  return {
    type: SHOW_NOTIFICATION,
    data,
    show,
    mode,
  };
}

export function toast(show, data = {}) {
  return action(show, data, 'toast');
}

export function alerts(show, data = {}) {
  return action(show, data, 'alert');
}
