import { combineReducers } from 'redux';
import testTodos from './reducer/testTodos';

const rootReducer = combineReducers({
  testTodos,
});

export default rootReducer;
