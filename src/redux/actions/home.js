import apiRequest from '../../services/apiRequest';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';
export const FETCH_ARTICLES_LOADING = 'FETCH_ARTICLES_LOADING';

// TODO: Pass pagination parameters

export const fetchArticlesFailed = error => ({
  type: FETCH_ARTICLES_ERROR,
  payload: error
});

export const fetchArticlesSucceeded = data => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: data
});

export const fetchArticlesStarted = () => ({
  type: FETCH_ARTICLES_LOADING
});

export const fetchArticles = () => async (dispatch) => {
  try {
    dispatch(fetchArticlesStarted());
    const result = await apiRequest.fetchArticles();
    const { data } = result;
    dispatch(fetchArticlesSucceeded(data));
  } catch (err) {
    if (err.response) {
      dispatch(fetchArticlesFailed(err.response.data));
    } else if (err.request) {
      dispatch(fetchArticlesFailed('Could not connect to server. Please check your connection'));
    } else {
      dispatch(fetchArticlesFailed('An error occurred. Please try again'));
    }
  }
};
