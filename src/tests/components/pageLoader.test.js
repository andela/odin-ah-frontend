import React from 'react';
import { shallow } from 'enzyme';
import PageLoader from '../../components/PageLoader';

test('renders Root component without crashing', () => {
  shallow(<PageLoader text={'test'}/>);
});
