import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaginationContainer extends Component {
  static propTypes = {
    totalPages: PropTypes.number,
    pageFetcher: PropTypes.func,
    currentPage: PropTypes.number,
    limit: PropTypes.number,
    children: PropTypes.func
  };

  nextPage = () => {
    const {
      totalPages, currentPage, pageFetcher, limit
    } = this.props;
    const lastPage = totalPages <= currentPage;
    if (lastPage) return;
    pageFetcher(currentPage + 1, limit);
  };

  prevPage = () => {
    const { currentPage, pageFetcher, limit } = this.props;
    const lastPage = currentPage <= 1;
    if (lastPage) return;
    pageFetcher(currentPage - 1, limit);
  };

  render() {
    const { totalPages, currentPage } = this.props;
    const childProps = {
      nextPageHandler: this.nextPage,
      prevPageHandler: this.prevPage,
      lastPage: totalPages <= currentPage,
      firstPage: currentPage <= 1
    };
    return <React.Fragment>{this.props.children(childProps)}</React.Fragment>;
  }
}
