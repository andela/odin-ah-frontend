import {
  FETCH_PTAGS_SUCCESS,
  FETCH_PTAGS_ERROR,
  FETCH_PTAGS_LOADING
} from '../../redux/actions/landingPage/tags';
import landingPageTags from '../../redux/reducer/landingPage/tags';

const initialState = {
  tags: [],
  loadingPopularTags: false,
  popularTagsError: false,
  popularTagsErrorMessage: ''
};

it('update state with tags fetched', () => {
  const action = {
    type: FETCH_PTAGS_SUCCESS,
    payload: {
      tags: ['tag1', 'tag2']
    }
  };
  const newState = landingPageTags(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    tags: action.payload.tags,
    loadingPopularTags: false,
    popularTagsError: false,
    popularTagsErrorMessage: ''
  });
});

it('update state with error if error occurs', () => {
  const action = {
    type: FETCH_PTAGS_ERROR,
    payload: 'An error occurred'
  };
  const newState = landingPageTags(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    loadingPopularTags: false,
    popularTagsError: true,
    popularTagsErrorMessage: action.payload
  });
});

it('update state with loading if tags are loading', () => {
  const action = {
    type: FETCH_PTAGS_LOADING
  };
  const newState = landingPageTags(initialState, action);
  expect(newState).toEqual({
    ...initialState,
    loadingPopularTags: true,
    popularTagsError: false
  });
});

it('should not update store', () => {
  const action = {};
  const newState = landingPageTags(initialState, action);
  expect(newState).toEqual(initialState);
});
