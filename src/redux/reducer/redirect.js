import { REDIRECT } from '../actions/redirect';


const redirectReducer = (state = {}, action) => {
  const { type, ...payload } = action;
  if (type === REDIRECT) {
    return { ...state, redirectTo: payload };
  }
  return state;
};

export default redirectReducer;
