import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
// import faker from 'faker';
import { bookMarkArticle } from '../../redux/actions/articles/articles';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const { slug } = 'demo-title-wjI1VLG6';

async function dispatchAction(length) {
  const store = mockStore({});
  await store.dispatch(bookMarkArticle(slug));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}


describe('Profile data action test', () => {
  it('creates BOOKMARK_ARTICLE_BEGINS and  FBOOKMARK_ARTICLE_FAILURE  actions', async () => {
    const apiReqStub = sinon.stub(apiRequest, 'bookMarkArticle')
      .rejects({
        request: {
          message: 'Network Error'
        }
      });
    await dispatchAction(2);
    apiReqStub.restore();
  });

  it('creates BOOKMARK_ARTICLE_BEGINS and  FBOOKMARK_ARTICLE_SUCCESS  actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post');
    await dispatchAction(2);
    apiReqStub.restore();
  });
});
