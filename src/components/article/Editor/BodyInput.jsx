import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { initBodyInput } from './initInput';

const BodyInput = ({
  value,
  onEditorChange,
  onChange,
  onFocusIn,
  onFocusOut,
  imageUploadHandler
}) => {
  const init = {
    ...initBodyInput,
    images_upload_handler: imageUploadHandler
  };
  return (<Editor
      value={value}
      init={init}
      onEditorChange={onEditorChange}
      onChange={onChange}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
  />);
};

BodyInput.propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocusIn: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  imageUploadHandler: PropTypes.func.isRequired,
};
export default BodyInput;
