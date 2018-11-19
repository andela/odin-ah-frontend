import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export class Notification extends Component {
  static createMarkup(text) {
    return { __html: text };
  }

  constructor(props) {
    super(props);
    this.toast = React.createRef();
    this.type = {
      success: 'is-success',
      error: 'is-danger',
      info: 'is-info',
      warning: 'is-warning'
    };
    this.timeout = null;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setTimeout(newProps.show);
  }

  setTimeout(show) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (show && this.props.autoDismiss) {
      const { timeout } = this.props.data;
      this.timeout = setTimeout(() => {
        this.props.dismiss();
      }, timeout);
    }
  }

  render() {
    const { data, show } = this.props;
    const type = this.type[data.type];
    const hide = (!show) ? 'dismiss' : 'show';
    return (
      <div ref={this.toast} className={`${this.props.mode} notification ${type} ${hide}`}>
        <button onClick={this.props.dismiss} className="delete"/>
        <p dangerouslySetInnerHTML={Notification.createMarkup(data.text)}/>
      </div>);
  }
}

export const basePropTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    timeout: PropTypes.number,
    type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  }).isRequired,
  show: PropTypes.bool,
  mode: PropTypes.oneOf(['toast', 'alert']),
};

export const defaultNotificationData = {
  text: '',
  type: 'success',
  timeout: 8000
};

Notification.propTypes = {
  ...basePropTypes,
  autoDismiss: PropTypes.bool,
  dismiss: PropTypes.func,
};

Notification.defaultProps = {
  show: false,
  data: defaultNotificationData,
  autoDismiss: true,
};

export default Notification;
