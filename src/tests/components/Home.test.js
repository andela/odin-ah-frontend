import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../components/home/Home';

it('renders Todos without crashing', () => {
  const mockRegisterFunc = jest.fn();
  const mockOpenModalFunc = jest.fn();
  const wrapper = shallow(<Home registerUser={mockRegisterFunc} openModal={mockOpenModalFunc} />);
  const homeHeader = <h1 >Home page</h1>;
  expect(wrapper.contains(homeHeader))
    .toEqual(true);
  wrapper.find('#signupBtn').simulate('click');
  expect(mockOpenModalFunc).toBeCalled();
});
