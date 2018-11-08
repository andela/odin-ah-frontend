import PropTypes from 'prop-types';
import React from 'react';

export function InputStatusLabel(props) {
  let type = '';
  if (props.type === 'success') {
    type = 'is-success';
  } else {
    type = 'is-danger';
  }
  return (
    <div>
      <p className={`error-js help ${type}`}>{props.error}</p>
    </div>
  );
}


InputStatusLabel.propTypes = {
  error: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success'])
};

InputStatusLabel.defaultProps = {
  errors: [],
  type: 'error',
};
export function InputStatusIcon(props) {
  let type = '';
  if (props.type === 'success') {
    type = 'fa-check';
  } else {
    type = 'fa-exclamation-triangle has-text-danger';
  }
  return (
    <span className="icon is-small is-right">
      <i className={`fa ${type}`}/>
    </span>);
}


InputStatusIcon.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};

InputStatusIcon.defaultProps = {
  type: 'error',
};
