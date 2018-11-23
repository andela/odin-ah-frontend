import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateFollowList, fetchFollowList } from '../../redux/actions/users/followList';
import { openLoginModal } from '../../redux/actions/modal';

const propTypes = {
  userId: PropTypes.number.isRequired,
  followList: PropTypes.array.isRequired,
  updateFollowList: PropTypes.func,
  loading: PropTypes.array,
  children: PropTypes.func,
  fetchFollowList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  openLoginModal: PropTypes.func.isRequired,
};

const defaultProps = {};

export class FollowButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      text: 'Follow',
      following: false
    };
  }

  componentDidMount() {
    this.props.fetchFollowList();
  }

  onClickHandler = () => {
    const { isAuthenticated, openLoginModal: popUpLoginModal } = this.props;
    if (!isAuthenticated) {
      popUpLoginModal();
      return;
    }
    this.props.updateFollowList(this.props.userId, this.state.following);
  };

  static getDerivedStateFromProps(props) {
    const following = props.followList.includes(props.userId);
    const text = following ? 'Unfollow' : 'Follow';
    const loading = props.loading.includes(props.userId);
    return { loading, text, following: Boolean(following) };
  }

  render() {
    const childProps = {
      text: this.state.text,
      onClickHandler: this.onClickHandler,
      loading: this.state.loading
    };
    return <React.Fragment>{this.props.children(childProps)}</React.Fragment>;
  }
}

FollowButtonContainer.propTypes = propTypes;
FollowButtonContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  followList: state.followList.followList,
  loading: state.followList.ongoingFetchOperations,
  isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = {
  updateFollowList,
  fetchFollowList,
  openLoginModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowButtonContainer);
