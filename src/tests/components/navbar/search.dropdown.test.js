import { shallow } from 'enzyme/build';
import React from 'react';
import { SearchDropDown } from '../../../components/navbar/search/SearchDropDown';

describe('Search Drop Down', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    jest.useFakeTimers();

    props = {
      search: jest.fn(),
      history: { push: jest.fn() },
      error: null,
      results: {
        tags: [{ tag: 'tag' }],
        search: [{ slug: 'slug' }]
      },
      metadata: {},
    };
    wrapper = shallow(<SearchDropDown {...props}/>);
  });

  test('simulate componentWillReceiveProps', () => {
    const instance = wrapper.instance();
    props.results = {
      tags: [],
      search: [],
    };
    wrapper.setProps(props);
    wrapper.update();
    instance.forceUpdate();
    expect(instance.state.showDropDown)
      .toEqual(false);
  });

  test('simulate handleSubmit', () => {
    const instance = wrapper.instance();
    instance.handleSubmit({ q: 'test' });
    jest.runAllTimers();
    expect(props.history.push).toBeCalledWith('/search?q=test');
  });

  test('simulate handleChange', () => {
    const instance = wrapper.instance();
    instance.handleChange('test');
    expect(props.search).toBeCalledWith({ q: 'test' });
  });

  test('simulate hideDropDown', () => {
    const instance = wrapper.instance();
    instance.hideDropDown();
    expect(instance.state.showDropDown)
      .toEqual(false);
  });
});


test('', () => {
  jest.useFakeTimers();
  const props = {
    search: jest.fn(),
    history: { push: jest.fn() },
    error: { message: 'error message' },
    results: null,
    metadata: {},
  };
  shallow(<SearchDropDown {...props}/>);
});
