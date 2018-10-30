import { TEST_TODOS } from '../../constants/todos';

export function success() {
  return {
    type: TEST_TODOS,
    payload: 'Test redux in action. Okay it works'
  };
}

export const simpleAction = () => (dispatch) => {
  dispatch(success());
};
