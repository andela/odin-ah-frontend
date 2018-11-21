import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import addReaction from '../../redux/actions/articles/likes';
import apiRequest from '../../services/apiRequest';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const slug = 'demo-title-wjI1VLG6';

async function dispatchAction(length) {
  const store = mockStore({});
  await store.dispatch(addReaction(slug));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

describe('like action test', () => {
  it('should creates ADD_REACTION action', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'addReaction')
      .resolves();
    await dispatchAction(1);
    apiReqStub.restore();
  });
});
