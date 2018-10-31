import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Notification, { basePropTypes, defaultData } from './index';
import { toast } from '../../redux/actions/notification';

export function Toast(props) {
  const { data, show, mode } = props;
  return (
    <Notification dismiss={props.dismissToast} data={data} show={show} mode={mode}/>);
}

Toast.propTypes = {
  ...basePropTypes,
  dismissToast: PropTypes.func
};

Toast.defaultProps = {
  show: false,
  data: defaultData,
  mode: 'toast'
};

const mapStateToProps = state => ({
  show: state.notification.toast.show,
  data: state.notification.toast.data,
  mode: state.notification.toast.mode,
});

const mapDispatchToProps = dispatch => ({
  dismissToast: () => dispatch(toast(false, defaultData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
