import * as types from '../../redux/constants/articles';
import likeReducer, { updateCount } from '../../redux/reducer/article/likes';

const initialState = {
  articleLiked: false,
  articleDisliked: false,
};

const reaction = {
  status: 'like',
  likeCount: 0,
  dislikeCount: 0
};

describe('Like Reducer', () => {
  it('should be able to add reaction ', (done) => {
    const action = {
      type: types.ADD_REACTION
    };
    const state = {
      ...initialState,
      reaction: {
        likeCount: 1, dislikeCount: 1, hasReacted: false, status: ''
      }
    };
    const newState = likeReducer(state, action);
    expect(newState).toEqual({
      articleDisliked: false,
      articleLiked: false,
      reaction: {
        dislikeCount: 1, hasReacted: true, likeCount: 1, status: undefined
      }
    });
    done();
  });
  it('should not add a reaction ', (done) => {
    const action = {
      type: types.ADD_REACTION,
      payload: {
        status: 'like'
      }
    };
    const state = {
      ...initialState,
      reaction: {
        likeCount: 0, dislikeCount: 0, hasReacted: false, status: 'dislike'
      }
    };
    const newState = likeReducer(state, action);
    expect(newState).toEqual({
      articleDisliked: false,
      articleLiked: false,
      reaction: {
        dislikeCount: 1, hasReacted: true, likeCount: 0, status: undefined
      }
    });
    done();
  });

  it('should add dislike reaction ', (done) => {
    const action = {
      type: types.ADD_REACTION,
      slug: 'when-you-publish-spwNinhS',
      status: 'neutral'
    };
    const state = {
      ...initialState,
      reaction: {
        likeCount: 1, dislikeCount: 1, hasReacted: true, status: 'dislike'
      }
    };
    const newState = likeReducer(state, action);
    expect(newState).toEqual({
      articleDisliked: false,
      articleLiked: false,
      reaction: {
        dislikeCount: 0, hasReacted: true, likeCount: 1, status: 'neutral'
      }
    });
    done();
  });
  it('should add like reaction', (done) => {
    const action = {
      type: types.ADD_REACTION,
      slug: 'when-you-publish-spwNinhS',
      status: 'neutral'
    };
    const state = {
      ...initialState,
      reaction: {
        likeCount: 1, dislikeCount: 1, hasReacted: true, status: 'like'
      }
    };
    const newState = likeReducer(state, action);
    expect(newState).toEqual(
      {
        articleDisliked: false,
        articleLiked: false,
        reaction: {
          dislikeCount: 1, hasReacted: true, likeCount: 0, status: 'neutral'
        }
      }
    );
    done();
  });
  it('should not neutralize a like reaction', (done) => {
    const action = {
      type: types.ADD_REACTION,
      slug: 'when-you-publish-spwNinhS',
      status: 'like'
    };
    const state = {
      ...initialState,
      reaction: {
        likeCount: 0, dislikeCount: 0, hasReacted: false
      }
    };
    const newState = likeReducer(state, action);
    expect(newState).toEqual({
      articleDisliked: false,
      articleLiked: false,
      reaction: {
        dislikeCount: 0, hasReacted: true, likeCount: 0, status: 'like'
      }
    });
    done();
  });
  it('should update count without throwing', () => {
    const reaction1 = { ...reaction, status: 'dislike' };
    updateCount(reaction1, 'like');
    const reaction2 = { ...reaction, status: 'like' };
    updateCount(reaction2, 'dislike');
    const reaction3 = { ...reaction, status: 'like' };
    updateCount(reaction3, 'neutral');
    const reaction4 = { ...reaction, status: 'neutral' };
    updateCount(reaction4, 'like');
    const reaction5 = { ...reaction, status: 'neutral' };
    updateCount(reaction5, 'dislike');
  });
  test('default reducer', () => {
    let state = {};
    state = likeReducer(state, {});
    expect(state)
      .toEqual({});
  });
});
