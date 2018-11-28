import apiRequest from '../../services/apiRequest';

export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const setLoading = ({ loading }) => ({
  type: SEARCH_RESULT,
  loading,
});
export const setSearch = ({
  loading, results, metadata, error
}) => ({
  type: SEARCH_RESULT,
  loading,
  results,
  metadata,
  error
});
export const search = query => async (dispatch) => {
  try {
    if (!query.q.length) {
      return dispatch(setSearch({
        loading: false,
        results: {
          search: [],
          tags: []
        },
        metadata: {},
      }));
    }
    dispatch(setLoading({ loading: true }));
    const filter = {
      filter: query.q,
    };
    const [searchResult, tagsResult] = await Promise.all([
      apiRequest.search(query), apiRequest.filterTags(filter)]);
    const { results, meta: searchMeta } = searchResult.data;
    const { tags, ...tagMeta } = tagsResult.data.data;
    const noResult = results.length === 0 && tags.length === 0;
    return dispatch(setSearch({
      loading: false,
      metadata: {
        search: searchMeta,
        tags: tagMeta
      },
      results: {
        search: results,
        tags
      },
      error: (noResult) ? { message: 'No result found.' } : null,
    }));
  } catch (e) {
    return dispatch(setSearch({
      loading: false,
      results: null,
      metadata: null,
      error: { message: 'Ops! Something went wrong. Try again.' }
    }));
  }
};
