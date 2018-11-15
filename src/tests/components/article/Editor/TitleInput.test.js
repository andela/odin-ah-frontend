import React from 'react';
import { mount } from 'enzyme';
import TitleInput from '../../../../components/article/Editor/TitleInput';

describe('TitleInput Component', () => {
  it('should render a h1 Editor without crashing', () => {
    const propFunction = () => {};
    const wrapper = mount(
      <TitleInput
        value={'Title'}
        onEditorChange={propFunction}
        onChange={propFunction}
        onFocusIn={propFunction}
        onFocusOut={propFunction}
        onPaste={propFunction}
      />
    );
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
