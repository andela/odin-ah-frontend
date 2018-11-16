import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import faker from 'faker';
import { profileData, uploadProfileData, uploadImageToCloud } from '../../redux/actions/profile';
import apiRequest from '../../services/apiRequest';
// import * as types from '../../redux/constants/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should start fetching user data', () => {
  const store = mockStore({});

  store.dispatch(profileData());

  const actions = store.getActions();
  expect(actions[0]).toHaveProperty('type');
  expect(actions[0].type).toBe('FETCH_PROFILE_BEGIN');
});

const profile = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  firstName: 'Hameedah',
  lastName: 'Okoro',
  bio: faker.lorem.sentences(),
  imageUrl: faker.image.imageUrl(),
  settings: {
    articleLike: true,
    newFollower: true,
    emailSubcribe: true,
    articleComment: true,
    newArticleFromUserFollowing: true,
    newFollowerOnSeries: true

  }
};

async function executeAction(length) {
  const store = mockStore({});
  await store.dispatch(profileData(profile));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

async function dispatchAction(length) {
  const store = mockStore({});
  await store.dispatch(uploadProfileData(profile));
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(length);
}

async function mockApiResponse(body = {}) {
  return new window.Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  });
}

describe('Profile data action test', () => {
  it('creates FETCH_PROFILE_BEGIN, FETCH_PROFILE_SUCCESS and FETCH_PROFILE_FAILURE actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'get').resolves(profile);
    await executeAction(3);
    apiReqStub.restore();
  });

  it('creates SAVE_PROFILE_BEGIN, SAVE_PROFILE_SUCCESS and SAVE_PROFILE_FAILURE actions', async () => {
    const apiReqStub = sinon.stub(apiRequest.axios, 'post').resolves(profile);
    await dispatchAction(3);
    apiReqStub.restore();
  });

  it(' should not returns image URL when their is no formdata pass', async () => {
    const apiReqStub = sinon.stub(window, 'fetch');
    window.fetch.returns(Promise.resolve(mockApiResponse()));
    const res = await uploadImageToCloud();
    expect(res).toBe(undefined);
    apiReqStub.restore();
  });
});
