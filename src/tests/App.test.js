import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { Todos } from '../components/Todos';

it('renders Todos without crashing', () => {
  const wrapper = shallow(<Todos />);
  expect(wrapper).toMatchSnapshot();
});


it('renders without crashing using enzyme', () => {
  shallow(<App/>);
});

it('renders welcome message', () => {
  const wrapper = shallow(<App/>);
  const welcome = <p className='test'>Authors Haven react base template</p>;
  expect(wrapper.contains(welcome))
    .toEqual(true);
});
