import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ articles: {} });

const errorResponse = {
  status: 401,
  response: {
    status: 'error',
    message: 'Internal server error',
  }
};

const successResponse = {
  status: 200,
  data: {
    status: 'success',
    message: 'Success',
  }
};

const axiosInstance = apiRequest.getInstance();
apiRequest.setToken('token');
apiRequest.registerInterceptors(store);
beforeAll(() => {
  store.clearActions();
  moxios.install(axiosInstance);
});
afterAll(() => {
  moxios.uninstall(axiosInstance);
});


test('should dispatch logout action when provided with invalid token', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith(errorResponse);
  });
  try {
    await apiRequest.createArticle('dummy');
  } catch (e) {
    const actions = store.getActions();
    expect(actions.length)
      .toEqual(1);
  }
});

test('should intercept response', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith(successResponse);
  });
  await apiRequest.createArticle('dummy');
});
