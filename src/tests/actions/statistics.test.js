import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { fetchStatistics } from '../../redux/actions/statistics';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const statistics = {
  data: {
    count: 5,
    uniqueViews: 23,
    allViews: 134,
  }
};

async function executeAction(length) {
  const store = mockStore({});
  await store.dispatch(fetchStatistics());
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

describe('Statistics action test', () => {
  it('creates FETCH_STATISTICS_BEGIN and FETCH_STATISTICS_SUCCESS  actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves(statistics);
    await executeAction(2);
    apiReqStub.restore();
  });

  it('creates FETCH_STATISTICS_BEGIN, FETCH_STATISTICS_SUCCESS and FETCH_STATISTICS_FAILURE actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get').rejects({ error: 'error' });
    await executeAction(3);
    apiReqStub.restore();
  });
});
