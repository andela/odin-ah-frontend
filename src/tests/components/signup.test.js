import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../../components/signup';

it('renders without crashing using enzyme', () => {
  shallow(<SignUp />);
});
