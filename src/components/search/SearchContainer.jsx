import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchView from '../navbar/search/SearchView';
import { search } from '../../redux/actions/search';

export class SearchContainer extends Component {
  getQuery = () => {
    const urlParams = new URLSearchParams(this.props.location.search);
    return urlParams.get('q') || '';
  };

  render() {
    return (
      <div>
        <SearchView
          query={this.getQuery()} autofocus={true} env='page'
          onSubmit={this.handleSearch}/>
      </div>
    );
  }

  handleSearch = (q) => {
    this.props.handleSearch(q);
  };
}

SearchContainer.propTypes = {
  handleSearch: PropTypes.func,
  location: PropTypes.object
};

SearchContainer.defaultProps = {};

export default connect(null, { handleSearch: search })(SearchContainer);
