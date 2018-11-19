import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Notification, { basePropTypes, defaultNotificationData } from './index';
import { dismissToast } from '../../redux/actions/notification';

export class Toast extends Component {
  render() {
    const { data, show, mode } = this.props;
    return (
    <Notification dismiss={this.props.dismissToast} data={data} show={show} mode={mode}/>);
  }
}

Toast.propTypes = {
  ...basePropTypes,
  dismissToast: PropTypes.func
};

Toast.defaultProps = {
  show: false,
  data: defaultNotificationData,
  mode: 'toast'
};

const mapStateToProps = state => ({
  show: state.notification.toast.show,
  data: state.notification.toast.data,
  mode: state.notification.toast.mode,
});

// const mapDispatchToProps = dispatch => ({
//   dismissToast: () => dispatch(toast(false, defaultNotificationData)),
// });

export default connect(mapStateToProps, { dismissToast })(Toast);
