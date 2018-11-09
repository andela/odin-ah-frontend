import {
  REGISTER_USER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESSFUL
} from '../../actions/auth/register';

export default function registration(state = {}, action = {}) {
  const { type, ...payload } = action;
  switch (type) {
    case REGISTER_USER:
    case REGISTRATION_FAILED:
    case REGISTRATION_SUCCESSFUL:
      return { ...state, ...payload };
    default:
      return state;
  }
}
