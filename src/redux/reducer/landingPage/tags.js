import {
  FETCH_PTAGS_SUCCESS,
  FETCH_PTAGS_ERROR,
  FETCH_PTAGS_LOADING
} from '../../actions/landingPage/tags';

const initialState = {
  tags: [],
  loadingPopularTags: false,
  popularTagsError: false,
  popularTagsErrorMessage: ''
};

const landingPageTags = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PTAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload.tags,
        loadingPopularTags: false,
        popularTagsError: false,
        popularTagsErrorMessage: ''
      };
    case FETCH_PTAGS_ERROR:
      return {
        ...state,
        loadingPopularTags: false,
        popularTagsError: true,
        popularTagsErrorMessage: action.payload
      };
    case FETCH_PTAGS_LOADING:
      return {
        ...state,
        loadingPopularTags: true,
        popularTagsError: false
      };
    default:
      return state;
  }
};

export default landingPageTags;
