import PropTypes from 'prop-types';
import React from 'react';

export default function TagPill({ name }) {
  return (
    <span className='tag-container__pill'>
      {name}
      </span>
  );
}

TagPill.propTypes = {
  name: PropTypes.string.isRequired
};

TagPill.defaultProps = {};
