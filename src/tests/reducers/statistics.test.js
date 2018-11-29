import reducers from '../../redux/reducer/statistics';

const initialState = {
  error: {},
  loading: false
};

describe('Statistics reducer', () => {
  it('it should handle action type of FETCH_STATISTICS_SUCCESS ', () => {
    const action = {
      type: 'FETCH_STATISTICS_SUCCESS',
      data: {
        count: 5,
        uniqueViews: 23,
        allViews: 134,
      }
    };
    const newState = reducers(initialState, action);
    expect(newState.type).toBe('FETCH_STATISTICS_SUCCESS');
    expect(newState.data.count).toBe(5);
  });

  it('it should handle action type of FETCH_STATISTICS_BEGIN ', () => {
    const action = {
      type: 'FETCH_STATISTICS_BEGIN',
    };
    const newState = reducers(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it('it should handle action type of FETCH_STATISTICS_FAILURE ', () => {
    const action = {
      type: 'FETCH_STATISTICS_FAILURE',
    };
    const newState = reducers(initialState, action);
    expect(newState.loading).toBe(false);
  });

  it('it should the initial state if there is no action', () => {
    const newState = reducers(initialState);
    expect(newState.loading).toBe(false);
  });
});
