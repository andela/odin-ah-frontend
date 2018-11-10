import React from 'react';
import PropTypes from 'prop-types';
import CreateableSelect from 'react-select/lib/Creatable';

const TagInput = ({
  tags,
  tagChangeHandler
}) => (
    <CreateableSelect
      placeholder="Add tags..."
      isMulti
      value={tags}
      onChange={tagChangeHandler}
    />
);

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagChangeHandler: PropTypes.func.isRequired,
};

export default TagInput;
