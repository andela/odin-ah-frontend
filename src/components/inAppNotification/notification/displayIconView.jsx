import React from 'react';
import PropTypes from 'prop-types';

const DisplayIconView = ({ totalNotification, onClick }) => {
  return (
  <div>
    <React.Fragment>
     {
       totalNotification > 0
       && <span className="count animated">
            {totalNotification}
          </span>
     } 
      <span onClick={onClick} className="fas fa-bell" />
    </React.Fragment>
  </div>
);
  }

DisplayIconView.propTypes = {
  totalNotification: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default DisplayIconView;
