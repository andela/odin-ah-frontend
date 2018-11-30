import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchFollowerList } from '../../redux/actions/users/followerList';

export class FollowerListContainer extends Component {
  static propTypes = {
    limit: PropTypes.number,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    total: PropTypes.number,
    fetchFollowerList: PropTypes.func,
    loading: PropTypes.bool,
    followerList: PropTypes.array,
    children: PropTypes.func
  };

  static defaultProps = {
    limit: 15
  };

  componentDidMount() {
    const { currentPage, limit } = this.props;
    this.props.fetchFollowerList(currentPage, limit);
  }

  handlePageFetch = (page, limit = 15) => {
    this.props.fetchFollowerList(page, limit);
  };

  render() {
    const {
      totalPages, total, currentPage, followerList, loading
    } = this.props;
    const childProps = {
      totalPages,
      total,
      currentPage,
      followerList,
      loading,
      pageFetcher: this.handlePageFetch
    };
    return <React.Fragment>{this.props.children(childProps)}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  followerList: state.followerList.followerList,
  currentPage: state.followerList.currentPage,
  totalPages: state.followerList.totalPages,
  total: state.followerList.total,
  loading: state.followerList.isLoading
});

const mapDispatchToProps = {
  fetchFollowerList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowerListContainer);
