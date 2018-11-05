import { shallow } from 'enzyme/build';
import React from 'react';
import { Modal } from '../../components/modal';

test('should trigger   dismissBtn ', async () => {
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
  };
  shallow(<Modal show={false} content={content} dismissModal={dismissModalSpy} />);
});
