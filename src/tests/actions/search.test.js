import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { search, SEARCH_RESULT } from '../../redux/actions/search';
import apiRequest from '../../services/apiRequest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const store = mockStore({});
const axiosInstance = apiRequest.getInstance();
beforeEach(() => {
  store.clearActions();
  moxios.install(axiosInstance);
});
afterEach(() => {
  moxios.uninstall(axiosInstance);
});

test('should execute redirect action, simulate successful request', async () => {
  // Alternatively URL can be a RegExp
  moxios.stubRequest(/search.*/, {
    status: 200,
    response: {
      results: [],
      meta: {}
    }
  });
  moxios.stubRequest(/tags.*/, {
    status: 200,
    response: {
      data: {
        tags: [],
        page: 1,
      },
    }
  });

  await store.dispatch(search({ q: 'test' }));
  const expected = [{
    type: 'SEARCH_RESULT',
    loading: true
  }, {
    type: SEARCH_RESULT,
    loading: false,
    results: {
      search: [],
      tags: [],

    },
    metadata: {
      search: {},
      tags: { page: 1 }
    },
    error: { message: 'No result found.' },
  }];
  moxios.wait(() => {
  });
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(2);
  expect(actions)
    .toEqual(expected);
});

test('should execute redirect action, simulate successful request', async () => {
  // Alternatively URL can be a RegExp
  moxios.stubRequest(/search.*/, {
    status: 200,
    response: {
      results: [{}],
      meta: {}
    }
  });
  moxios.stubRequest(/tags.*/, {
    status: 200,
    response: {
      data: {
        tags: [],
        page: 1,
      },
    }
  });

  await store.dispatch(search({ q: 'test' }));
  const expected = [{
    type: 'SEARCH_RESULT',
    loading: true
  }, {
    type: SEARCH_RESULT,
    loading: false,
    results: {
      search: [{}],
      tags: [],

    },
    metadata: {
      search: {},
      tags: { page: 1 }
    },
    error: null,
  }];
  moxios.wait(() => {
  });
  const actions = store.getActions();
  expect(actions.length)
    .toEqual(2);
  expect(actions)
    .toEqual(expected);
});
test('should execute redirect action, simulate successful request', async () => {
  // Alternatively URL can be a RegExp
  moxios.stubRequest(/search.*/, {
    status: 500,
    response: {
      message: 'message',
      meta: {}
    }
  });
  moxios.stubRequest(/tags.*/, {
    status: 200,
    response: {
      data: {
        tags: [],
        page: 1,
      },
    }
  });
  await store.dispatch(search({ q: 'test' }));
  await moxios.wait(() => {
  });
  const actions = store.getActions();
  const expected = [
    {
      type: 'SEARCH_RESULT',
      loading: true
    },
    {
      type: 'SEARCH_RESULT',
      loading: false,
      results: null,
      metadata: null,
      error: { message: 'Ops! Something went wrong. Try again.' }
    }
  ];
  expect(actions.length)
    .toEqual(2);
  expect(actions)
    .toEqual(expected);
});
test('should execute redirect action, simulate successful request', async () => {
  await store.dispatch(search({ q: '' }));
  const actions = store.getActions();
  const expected = [
    {
      type: 'SEARCH_RESULT',
      loading: false,
      results: {
        search: [],
        tags: [],

      },
      metadata: {},
      error: undefined
    }
  ];
  expect(actions.length)
    .toEqual(1);
  expect(actions)
    .toEqual(expected);
});
