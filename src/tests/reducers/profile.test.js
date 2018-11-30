import reducers from '../../redux/reducer/profile';

const initialState = {
  error: {},
  loading: false,
};

describe('Profile reducer', () => {
  it('it should handle action type of FETCH_PROFILE_SUCCESS ', () => {
    const action = {
      type: 'FETCH_PROFILE_SUCCESS',
      data: {
        id: 1,
        username: 'macphilipsjjnn',
        email: 'dummy-user@local.host',
        firstName: 'John fishkjjkk',
        lastName: 'victor love',
        bio: `Entrepreneur and businessman Bill Gates (born October 28, 1955) and his partner Paul
           Allen founded and built the world's `,
        imageUrl: 'http://res.cloudinary.com/dk2ot4wij/image/upload/v1542105187/aw6iprpsqcxxqlcxii8x.png',
        settings: {
          articleLike: true,
          newFollower: true,
          articleComment: false,
          emailSubscribe: true,
          newFollowerOnSeries: true,
          newArticleFromUserFollowing: true,
        }
      },
    };
    const newState = reducers(initialState, action);
    expect(newState.type).toBe('FETCH_PROFILE_SUCCESS');
    expect(newState.data.username).toBe('macphilipsjjnn');
  });


  it('it should handle action type of FETCH_PROFILE_BEGIN', () => {
    const action = {
      type: 'FETCH_PROFILE_BEGIN'
    };
    const newState = reducers(initialState, action);
    expect(newState).toEqual({ ...{ error: null, loading: true } });
  });

  it('it should handle action type of FETCH_PROFILE_FAILURE', () => {
    const action = {
      type: 'FETCH_PROFILE_FAILURE'
    };
    const newState = reducers(initialState, action);
    expect(newState).toEqual({
      ...{
        error: {}, loading: false, type: 'FETCH_PROFILE_FAILURE'
      }
    });
  });

  it('it should handle action type of SAVE_PROFILE_BEGIN', () => {
    const action = {
      type: 'SAVE_PROFILE_BEGIN'
    };
    const newState = reducers(initialState, action);
    expect(newState).toEqual({
      ...{
        error: {},
        loading: true
      }
    });
  });

  it('it should handle action type of SAVE_PROFILE_SUCCESS', () => {
    const action = {
      type: 'SAVE_PROFILE_SUCCESS'
    };
    const newState = reducers(initialState, action);
    expect(newState).toEqual({ ...{ error: {}, loading: false } });
  });

  it('it should handle action type of SAVE_PROFILE_FAILURE', () => {
    const action = {
      type: 'SAVE_PROFILE_FAILURE'
    };
    const newState = reducers(initialState, action);
    expect(newState).toEqual({
      ...action,
      ...{
        error: {},
        loading: false
      }
    });
  });
});
