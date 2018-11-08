import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Notification, { basePropTypes, defaultNotificationData } from './index';
import { dismissAlert } from '../../redux/actions/notification';

export function Alert(props) {
  const { data, show, mode } = props;
  return (
    <Notification dismiss={props.dismissAlert} data={data} show={show} mode={mode}/>);
}

Alert.propTypes = {
  ...basePropTypes,
  dismissAlert: PropTypes.func
};

Alert.defaultProps = {
  show: false,
  data: defaultNotificationData,
  mode: 'alert'
};

const mapStateToProps = state => ({
  show: state.notification.alert.show,
  data: state.notification.alert.data,
  mode: state.notification.alert.mode,
});

export default connect(mapStateToProps, { dismissAlert })(Alert);
