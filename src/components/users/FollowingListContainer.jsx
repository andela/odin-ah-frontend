import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchFollowList } from '../../redux/actions/users/followList';

export class FollowingListContainer extends Component {
  static propTypes = {
    limit: PropTypes.number,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    total: PropTypes.number,
    fetchFollowList: PropTypes.func,
    loading: PropTypes.bool,
    followList: PropTypes.array,
    children: PropTypes.func,
    sync: PropTypes.bool
  };

  static defaultProps = {
    limit: 15
  };

  componentDidMount() {
    const { currentPage, limit } = this.props;
    this.props.fetchFollowList(currentPage, limit);
  }

  handlePageFetch = (page, limit = 15) => {
    this.props.fetchFollowList(page, limit);
  };

  componentDidUpdate() {
    const { sync, currentPage } = this.props;
    if (!sync) this.handlePageFetch(currentPage);
  }

  render() {
    const {
      totalPages, currentPage, total, followList, loading
    } = this.props;
    const childProps = {
      totalPages,
      currentPage,
      followList,
      loading,
      total,
      pageFetcher: this.handlePageFetch
    };
    return <React.Fragment>{this.props.children(childProps)}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  followList: state.followList.followList,
  currentPage: state.followList.currentPage,
  totalPages: state.followList.totalPages,
  loading: state.followList.isLoading,
  total: state.followList.total,
  sync: state.followList.storeIsSynced
});

const mapDispatchToProps = {
  fetchFollowList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingListContainer);
