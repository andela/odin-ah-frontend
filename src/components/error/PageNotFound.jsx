import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Notification from '../notification';

export default function PageNotFound({ title, text }) {
  return (
    <div >
      <div className='error'>
        <div className='error-content'>
            <div className="big-message quiet">
              <h1 dangerouslySetInnerHTML={Notification.createMarkup(title)}/>
              <p dangerouslySetInnerHTML={Notification.createMarkup(text)}/>
            </div>
        </div>
      </div>
    </div>
  );
}


PageNotFound.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

PageNotFound.defaultProps = {
  title: '404 Error',
  text: ''
};
