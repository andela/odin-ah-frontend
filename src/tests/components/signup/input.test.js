import { shallow } from 'enzyme';
import React from 'react';
import faker from 'faker';
import Input from '../../../components/signup/Input';
import generateEvent from '../../utils';


test('renders Input component', () => {
  const mockOnUpdateFunc = jest.fn();
  const mockValidateFieldFunc = jest.fn();
  const field = 'email';
  let value = null;
  const wrapper = shallow(
    <Input
      placeholder={'Placeholder'}
      iconType={'user'}
      fieldError={'error'} showLabel={true}
      validateField={mockValidateFieldFunc}
      value={value}
      type={'text'}
      field={field}
      onUpdate={mockOnUpdateFunc}/>
  );
  value = faker.internet.email();
  const invalidEmailEvent = generateEvent(field, value);
  wrapper.find(`#${field}`)
    .simulate('blur', invalidEmailEvent);
  wrapper.find(`#${field}`)
    .simulate('change', invalidEmailEvent);

  expect(mockOnUpdateFunc.mock.calls.length)
    .toBe(1);
  expect(mockOnUpdateFunc.mock.calls.length)
    .toBe(1);
  const data = {};
  data[field] = value;
  expect(mockOnUpdateFunc)
    .toBeCalledWith(data);
});
