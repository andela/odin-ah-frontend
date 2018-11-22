import {
  FETCH_BOOKMARK_ARTICLE_SUCCESS,
  FETCH_ARTICLES_FROM_STORE,
  INVALID_ACTION
} from '../../redux/constants/articles';
import reducer from '../../redux/reducer/article/bookmark';

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
  totalCount: 0,
};

it('update state with fetched bookmarks', () => {
  const successAction = {
    type: FETCH_BOOKMARK_ARTICLE_SUCCESS,
    data: {
      bookmarks: {
        article: []
      },
      page: 1,
      totalPages: 5,
      total: 50,
      size: 10,
      article: []
    }

  };
  const newState = reducer(initialState, successAction);
 expect(newState.loadingArticles).toBe(false);
});

it('fetch articles from store', () => {
  const action = {
    type: FETCH_ARTICLES_FROM_STORE,
    pageToLoad: 5
  };
  const newState = reducer(initialState, action);
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
  const newState = reducer(initialState, action);
  expect(newState).toEqual(initialState);
});

