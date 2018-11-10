import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { initTitleInput, APIKEY } from './initInput';

const TitleInput = ({
  value,
  onEditorChange,
  onChange,
  onPaste,
  onFocusIn,
  onFocusOut
}) => (
    <Editor
      apiKey={APIKEY}
      tagName='h1'
      value={value}
      init={initTitleInput}
      onEditorChange={onEditorChange}
      onChange={onChange}
      onPaste={onPaste}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
    />
);

TitleInput.propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  onFocusIn: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
};

export default TitleInput;
