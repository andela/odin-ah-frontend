import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING,
  FETCH_ARTICLES_FROM_STORE,
  INVALID_ACTION
} from '../../redux/actions/landingPage/articles';
import landingPageArticles from '../../redux/reducer/landingPage/articles';

const initialState = {
  articles: [],
  loadingArticles: false,
  articlesError: false,
  articlesErrorMessage: '',
  articlesInView: [],
  totalPages: null,
  currentPage: null,
  size: 20,
  pagesFetched: 0,
  totalCount: 0
};

it('update state with articles fetched', () => {
  const successAction = {
    type: FETCH_ARTICLES_SUCCESS,
    payload: {
      data: {
        page: 1,
        totalPages: 5,
        total: 50,
        size: 10,
        articles: []
      }
    }
  };
  const newState = landingPageArticles(initialState, successAction);
  expect(newState).toEqual({ ...initialState, ...newState });
});

it('update state with error if error occurs', () => {
  const action = {
    type: FETCH_ARTICLES_ERROR,
    payload: 'An error occurred'
  };
  const newState = landingPageArticles(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    loadingArticles: false,
    articlesError: true,
    articlesErrorMessage: action.payload
  });
});

it('update state with loading if article is loading', () => {
  const action = {
    type: FETCH_ARTICLES_LOADING
  };
  const newState = landingPageArticles(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    loadingArticles: true,
    articlesError: false
  });
});

it('fetch articles from store', () => {
  const action = {
    type: FETCH_ARTICLES_FROM_STORE,
    pageToLoad: 5
  };
  const newState = landingPageArticles(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    currentPage: action.pageToLoad,
    loadingArticles: false,
    articlesError: false,
    articlesInView: []
  });
});

it('should not update state', () => {
  const action = {
    type: INVALID_ACTION
  };
  const newState = landingPageArticles(initialState, action);
  expect(newState).toEqual(initialState);
});

it('should not update state with empty action', () => {
  const action = {};
  const newState = landingPageArticles(initialState, action);
  expect(newState).toEqual(initialState);
});
