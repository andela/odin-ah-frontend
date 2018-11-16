import React from 'react';
import { shallow } from 'enzyme';
import PageLoader from '../../components/PageLoader';

test('renders PageLoader component without crashing', () => {
  shallow(<PageLoader text={'test'}/>);
});
