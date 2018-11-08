import React from 'react';
import PropTypes from 'prop-types';

export default function PageLoader({ text }) {
  return (
    <div id="loader" className="center-in-page loading-bg">
      <div>
        <div className="lds-dual-ring"/>
      </div>
      <p>{text}</p>
    </div>
  );
}


PageLoader.propTypes = {
  text: PropTypes.string,
};

PageLoader.defaultProps = {
  text: 'Loading'
};
