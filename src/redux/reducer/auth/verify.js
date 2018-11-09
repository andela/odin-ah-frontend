import { VERIFICATION } from '../../actions/auth/verify';

const defaultState = { verifying: false, loading: false };
export default function verify(state = defaultState, action = {}) {
  const { type, ...payload } = action;
  switch (type) {
    case VERIFICATION:
      return { ...state, ...payload };
    default:
      return state;
  }
}
