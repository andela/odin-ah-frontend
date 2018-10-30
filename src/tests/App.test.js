import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('renders without crashing using enzyme', () => {
  shallow(<App/>);
});
