import { shallow } from 'enzyme/build';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ModalBox, { Modal } from '../../components/modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('should trigger dismissBtn ', async () => {
  const dismissModalSpy = jest.fn();
  const content = {
    props: { onSubmit: () => {} },
    Component: '<div>Test</div>'
  };
  const wrapper = shallow(<Modal show={true} content={content} dismissModal={dismissModalSpy} />);
  wrapper.find('button').simulate('click');
  expect(dismissModalSpy.mock.calls.length).toBe(1);
});
test('should renders Modal without crashing', async () => {
  const dismissModalSpy = jest.fn();
  const content = {
    props: {},
    Component: null
  };

  const store = mockStore({ modal: { state: true, content } });
  shallow(<ModalBox store={store} dismissModal={dismissModalSpy} />);
});
