import articlesByTagReducer from '../../redux/reducer/articlesByTag';
import { LOADING_ARTICLES_BY_TAG, GET_ARTICLES_BY_TAG, ARTICLES_BY_TAG_ERROR } from '../../redux/constants/articles';

const initialState = {
  articles: [],
  loading: false
};

const response = {
  articles: [
    {
      slug: 'my-recent-learning-journey-bggLag6B',
      title: 'My Recent Learning Journey',
      body: 'Body here'
    }
  ],
};
const errors = { message: 'An error occured' };

describe('articlesByTags reducer', () => {
  it('should return the initial state when action type is not handled', () => {
    const action = { type: 'UNHANDLED_ACTION' };
    const state = articlesByTagReducer(undefined, action);
    expect(state).toEqual({ ...initialState });
  });
  it('should handle LOADING_ARTICLES_BY_TAG action correctly', () => {
    const action = { type: LOADING_ARTICLES_BY_TAG };
    const state = articlesByTagReducer(undefined, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  it('should handle GET_ARTICLES_BY_TAG action correctly', () => {
    const action = { type: GET_ARTICLES_BY_TAG, response };
    const state = articlesByTagReducer(undefined, action);
    expect(state).toEqual({ ...initialState, loading: false, ...response });
  });
  it('should handle ARTICLES_BY_TAG_ERROR action correctly', () => {
    const action = { type: ARTICLES_BY_TAG_ERROR, errors };
    const state = articlesByTagReducer(undefined, action);
    expect(state).toEqual({ ...initialState, loading: false, errors });
  });
});
