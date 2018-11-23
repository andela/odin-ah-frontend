import React, { Component } from 'react';
// import connect from 'react-redux/es/connect/connect';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import NavBarDropDown from '../NavBarDropDown';
import DisplayIconView from './displayIconView';
import MenuBody from './menuBody';
import {
  getNotification,
  updateNotification,
  listenForNotification
} from '../../../redux/actions/inAppNotification';
import './style.scss';

export class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
    }
    this.handleIconClicked = this.handleIconClicked.bind(this);
    this.handleNotificationCheck = this.handleNotificationCheck.bind(this);
  }
  state = {
    count: 0
  };

  static getDerivedStateFromProps(props) {
    let count = 0;
    props.notificationValue.forEach((notification) => {
      if (notification.isRead === false) {
        count += 1;
      }
    });
    if (props.newMessageFromSocket) props.getNotification();
    return { count };
  }

  handleIconClicked() {
    this.setState({ showDropDown: !this.state.showDropDown })
  }

  componentDidMount() {
    this.props.getNotification();
    this.props.listenForNotification(this.props.userId);
  }

  handleNotificationCheck(event) {
    const notificationId = event.currentTarget.dataset.id 
    this.props.updateNotification(notificationId);
    this.props.getNotification();

  };

  

  render() {
    const display = <DisplayIconView onClick={this.handleIconClicked} totalNotification={this.state.count} />;
    const body = (
      <MenuBody
        notificationValue={this.props.notificationValue}
        handleNotificationCheck={this.handleNotificationCheck}
      />
    );
    return (
    <div className='notifications'>
      <NavBarDropDown show={this.state.showDropDown} menuBody={body} display={display} />
    </div>
    );
  }
}

DropDown.propTypes = {
  getNotification: PropTypes.func,
  handleNotificationCheck: PropTypes.func,
  newMessageFromSocket: PropTypes.bool
};

const mapStateToProps = state => ({
  notificationValue: state.notificationReducer.notifications,
  userId: state.login.user.id,
  newMessageFromSocket: state.notificationReducer.newMessageFromSocket
});

const mapDispatchToProps = {
  getNotification,
  updateNotification,
  listenForNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDown);
