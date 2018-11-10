import React from 'react';
import { mount } from 'enzyme';
import BodyInput from '../../../../components/article/Editor/BodyInput';

describe('BodyInput Component', () => {
  it('should render Editor without crashing', () => {
    const propFunction = () => {};
    const wrapper = mount(
      <BodyInput
        value={'Start typing...'}
        onEditorChange={propFunction}
        onChange={propFunction}
        onFocusIn={propFunction}
        onFocusOut={propFunction}
        imageUploadHandler={propFunction}
       />
    );
    expect(wrapper.find('Editor>div')).toHaveLength(1);
  });
});
