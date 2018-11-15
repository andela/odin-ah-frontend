import PropTypes from 'prop-types';
import React from 'react';
import TagPill from './tagPill';

export default function TagPillContainer({ tags }) {
  return (
    <div className={'tag-container'}>
      {
        tags.map(name => (<TagPill key={name} name={name}/>))
      }
    </div>
  );
}

TagPillContainer.propTypes = {
  tags: PropTypes.array
};

TagPillContainer.defaultProps = {};
