import React from 'react';
import PropTypes from 'prop-types';
import transformDate from '../../utils/dateTransformer';
import './CircularDateView.scss';

const CircularDateView = ({ date, styles }) => {
  const { day, month } = transformDate(date);
  return (
    <div className="circular-date-container" style={styles}>
      <div className="date-field date-field__day">{day}</div>
      <div className="date-field date-field__month">{month.slice(0, 3)}</div>
    </div>
  );
};

CircularDateView.propTypes = {
  date: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default CircularDateView;
