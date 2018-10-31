import {
  REGISTER_USER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESSFUL
} from '../../actions/auth/register';

export default function registration(state = {}, action = {}) {
  switch (action.type) {
    case REGISTER_USER:
    case REGISTRATION_FAILED:
    case REGISTRATION_SUCCESSFUL:
      return { ...state, ...action };
    default:
      return state;
  }
}
