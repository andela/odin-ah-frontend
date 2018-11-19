import { shallow } from 'enzyme/build';
import React from 'react';
import { ModalContent } from '../../../components/modal/content/modalComponent';

test('should render ModalContent without crashing', () => {
  const registerUser = jest.fn();
  shallow(<ModalContent registerUser={registerUser}/>);
});
