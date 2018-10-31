import { shallow } from 'enzyme/build';
import React from 'react';
import { InputStatusIcon, InputStatusLabel } from '../../../components/signup/ErrorLabel';

test('should render InputStatusIcon without crashing', () => {
  shallow(<InputStatusLabel errors={['message 1', 'message 2']} type={'success'}/>);
  shallow(<InputStatusLabel errors={[]} type={'error'}/>);
});
test('should render InputStatusIcon without crashing', () => {
  shallow(<InputStatusIcon type={'success'}/>);
  shallow(<InputStatusIcon type={'error'}/>);
});
