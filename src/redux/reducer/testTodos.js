import { TEST_TODOS } from '../constants/todos';

export default function testTodos(state = {}, action = {}) {
  switch (action.type) {
    case TEST_TODOS:
      return action.payload;
    default:
      return state;
  }
}
