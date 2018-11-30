import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateFollowList, fetchSingleFollow } from '../../redux/actions/users/followList';
import { openLoginModal } from '../../redux/actions/modal';

const propTypes = {
  userId: PropTypes.number.isRequired,
  updateFollowList: PropTypes.func,
  children: PropTypes.func,
  fetchFollowList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  openLoginModal: PropTypes.func.isRequired,
  fetchSingleFollow: PropTypes.func,
  singleFollowStream: PropTypes.object
};

const defaultProps = {};

export class FollowButtonContainer extends React.Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.fetchSingleFollow(userId);
  }

  onClickHandler = () => {
    const {
      isAuthenticated,
      openLoginModal: popUpLoginModal,
      singleFollowStream: { status }
    } = this.props;
    if (!isAuthenticated) {
      popUpLoginModal();
      return;
    }
    this.props.updateFollowList(this.props.userId, status);
  };

  shouldComponentUpdate(nextProps) {
    const { authorId: eventOwner, error } = nextProps.singleFollowStream;
    if (eventOwner === nextProps.userId && !error) {
      return true;
    }
    return false;
  }

  render() {
    const { status, done } = this.props.singleFollowStream;
    const childProps = {
      text: status ? 'Unfollow' : 'Follow',
      onClickHandler: this.onClickHandler,
      loading: !done
    };
    return <React.Fragment>{this.props.children(childProps)}</React.Fragment>;
  }
}

FollowButtonContainer.propTypes = propTypes;
FollowButtonContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  singleFollowStream: state.followList.singleFollowStream,
  isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = {
  updateFollowList,
  openLoginModal,
  fetchSingleFollow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowButtonContainer);
