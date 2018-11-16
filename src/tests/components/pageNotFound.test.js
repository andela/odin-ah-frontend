import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../components/error/PageNotFound';

test('renders PageNotFound component without crashing', () => {
  shallow(<PageNotFound text={'test'}/>);
});
