export const REDIRECT = 'REDIRECT';
export const redirect = to => dispatch => dispatch({
  type: REDIRECT,
  to
});
