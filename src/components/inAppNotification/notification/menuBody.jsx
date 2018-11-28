import React from 'react';
import PropTypes from 'prop-types';
import { toSentenceCase}  from '../../../utils'

const menuBody = ({ notificationValue, handleNotificationCheck }) => {
  const messagedisplay = notificationValue.map(notification => {
  const hasRead = !notification.isRead ? ' new' : '';
   return (
    <li
      onClick={handleNotificationCheck}
      data-id={notification.id}
      key={notification.id}       
            >

  <div className={`message_body${hasRead}`} >
          {toSentenceCase(notification.message)} 
        </div>
      </li>
  
  )});
  return <div><ul>{messagedisplay}</ul></div>;
};

menuBody.propTypes = {
  notificationValue: PropTypes.array,
  handleNotificationCheck: PropTypes.func
};

export default menuBody;
