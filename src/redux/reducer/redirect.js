import { REDIRECT } from '../actions/redirect';


const redirectReducer = (state = {}, action) => {
  const { type, ...payload } = action;
  if (type === REDIRECT) {
    return { ...state, ...payload };
  }
  return state;
};

export default redirectReducer;
