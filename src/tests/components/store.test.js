import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { simpleAction, success } from '../../redux/actions/todos/todos';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should execute fetch data', () => {
  const store = mockStore({});

  // Return the promise
  store.dispatch(simpleAction());

  const actions = store.getActions();
  expect(actions[0]).toEqual(success());
});
