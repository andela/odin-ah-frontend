import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { initTitleInput, APIKEY } from './initInput';

const TitleInput = ({
  value,
  onEditorChange,
  onChange,
  onFocusIn,
  onFocusOut
}) => (
  <div>
    <Editor
      apiKey={APIKEY}
      tagName='h1'
      value={value}
      init={initTitleInput}
      onEditorChange={onEditorChange}
      onChange={onChange}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
    />
  </div>
);

TitleInput.propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocusIn: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
};

export default TitleInput;
