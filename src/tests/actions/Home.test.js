import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchArticlesStarted } from '../../redux/actions/home';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should start data fetching', () => {
  const store = mockStore({});

  store.dispatch(fetchArticlesStarted());

  const actions = store.getActions();
  expect(actions[0]).toEqual(fetchArticlesStarted());
});
