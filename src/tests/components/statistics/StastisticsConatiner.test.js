import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import StastisticsConatinerConncted, { StastisticsConatiner } from '../../../components/statistics/StastisticsConatiner';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const statistics = {
  data: {
    count: 5,
    uniqueViews: 23,
    allViews: 134,
  }
};

const propSet = {
  componentDidMount: jest.fn(() => Promise.resolve()),
  fetchStatistics: jest.fn(() => Promise.resolve())
};

it('should render StastisticsConatiner', () => {
  const wrapper = mount(<StastisticsConatiner {...propSet}/>);
  expect(wrapper.exists()).toBe(true);
});

it('should synchronise with app state in the store', () => {
  const store = mockStore({ statistics });
  const wrapper = mount(<StastisticsConatinerConncted {...propSet} store={store} />);
  wrapper.instance().componentDidMount();
  expect(wrapper.prop('fetchStatistics')).toHaveBeenCalled;
});
