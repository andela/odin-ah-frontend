import React from 'react';
import PropTypes from 'prop-types';
import './statistics.scss';

const StatisticsHolder = props => {
  return (
    <>
    <div className='circler-wrapper'>
         <span>{props.number}</span>
         <span>{props.title}</span>
    </div>
    </>
  )
}

StatisticsHolder.propTypes = {
    number: PropTypes.number,
    title: PropTypes.string,
}

export default StatisticsHolder;
