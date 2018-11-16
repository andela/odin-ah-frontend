import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Routes from '../../../components/routes/Routes';
import { mockStoreData } from '../../__mocks__/mockData';


jest.mock('react-router-dom');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const props = {
  location: { pathname: '/article/new' },
};
const store = mockStore({ mockStoreData });

test('renders Routes component without crashing', () => {
  const wrapper = shallow(<Routes store={store} location={props.location} />);
  expect(wrapper).toBeDefined();
});
