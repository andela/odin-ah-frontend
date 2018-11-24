import { mount } from 'enzyme/build';
import React from 'react';
import SearchView from '../../../components/navbar/search/SearchView';

describe('Search View', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    jest.useFakeTimers();
    props = {
      onSubmit: jest.fn(),
      onBlur: jest.fn(),
      onQueryUpdated: jest.fn(),
      onViewClosed: jest.fn(),
      query: 'test',
      autofocus: true,
      env: 'page',
    };
    wrapper = mount(<SearchView {...props}/>);
  });
  test('simulate keydown', () => {
    const preventDefault = jest.fn();
    wrapper.find(`#${props.env}_search`)
      .simulate('keydown', {
        which: 13,
        keyCode: 13,
        preventDefault,
      });
    jest.runAllTimers();
    expect(preventDefault)
      .toBeCalled();
    expect(props.onSubmit)
      .toBeCalledWith({ q: props.query });
  });
  test('simulate onBlur', () => {
    wrapper.find(`#${props.env}_search`)
      .simulate('blur', {});
    jest.runAllTimers();
  });
  test('simulate onChange', () => {
    wrapper.find(`#${props.env}_search`)
      .simulate('change', {
        target: {
          name: 'q',
          value: 'new query'
        }
      });
    jest.runAllTimers();
    expect(props.onQueryUpdated)
      .toBeCalledWith('new query');
  });
  test('simulate submit', () => {
    const preventDefault = jest.fn();
    wrapper.find(`#${props.env}_search`)
      .simulate('focus', {
        target: {
          name: 'q',
          value: 'new query'
        }
      });
    wrapper.find(`#${props.env}_search_submit`)
      .simulate('click', { preventDefault });
    wrapper.find(`#${props.env}_search_submit`)
      .simulate('click', { preventDefault });
    jest.runAllTimers();
    expect(preventDefault)
      .toBeCalled();
    expect(props.onSubmit)
      .toBeCalledWith({ q: props.query });
  });
});
