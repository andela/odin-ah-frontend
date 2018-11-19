export const REDIRECT = 'REDIRECT';

const path = (to = null) => ({
  type: REDIRECT,
  redirectTo: { to }
});

export const redirect = to => dispatch => dispatch(path(to));

export const clearRedirect = () => (dispatch) => {
  dispatch(path());
};
export const redirectToReferrer = from => dispatch => dispatch({
  type: REDIRECT,
  referrer: { from }
});
