import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../components/Routes';

test('renders Root component without crashing', () => {
  shallow(<Root />);
});
