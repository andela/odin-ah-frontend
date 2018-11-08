import { shallow } from 'enzyme/build';
import React from 'react';
import { InputStatusIcon, InputStatusLabel } from '../../../components/signup/ErrorLabel';

test('should render InputStatusIcon without crashing', () => {
  shallow(<InputStatusLabel error={'message 1'} type={'success'}/>);
  shallow(<InputStatusLabel error={'message 1'} type={'error'}/>);
});
test('should render InputStatusIcon without crashing', () => {
  shallow(<InputStatusIcon type={'success'}/>);
  shallow(<InputStatusIcon type={'error'}/>);
});
