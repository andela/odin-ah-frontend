import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { initBodyInput } from './initInput';


const BodyInput = ({
  value,
  onEditorChange,
  onChange,
  onFocusIn,
  onFocusOut
}) => (
  <div>
    <Editor
      value={value}
      init={initBodyInput}
      onEditorChange={onEditorChange}
      onChange={onChange}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
    />
  </div>
);

BodyInput.propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocusIn: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
};
export default BodyInput;
