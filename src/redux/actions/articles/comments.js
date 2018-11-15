import apiRequest from '../../../services/apiRequest';

export const GET_COMMENTS = 'GET_COMMENTS';

export const completed = (loading, comments = null) => ({
  type: GET_COMMENTS,
  comments,
  loading,
});

export const getComments = (slug, id) => async (dispatch) => {
  try {
    dispatch(completed(true));
    const result = await apiRequest.getComments(slug, id);
    const { comments } = result.data.data;
    dispatch(completed(false, comments));
  } catch (e) {
    dispatch(completed(false));
  }
};
