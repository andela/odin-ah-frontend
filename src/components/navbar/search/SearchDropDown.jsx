import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from '../../../redux/actions/search';
import SearchView from './SearchView';
import ItemView from './itemView';
import NavBarDropDown from '../NavBarDropDown';
import MenuHeader from './menuHeader';
import CategoryHeader from './CategoryHeader';
import EmptyItemView from './emptyItemView';

export class SearchDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      searchViewState: 'close',
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ showDropDown: this.shouldShowDropDown(newProps) });
  }

  shouldShowDropDown = (props) => {
    const { results, error } = props;
    const searchResults = this.getSearchResults(results);
    const tagResults = this.getTagResults(results);
    const hasSearchResults = searchResults.length > 0;
    const hasTagResults = tagResults.length > 0;
    return hasSearchResults || hasTagResults || !!error;
  };

  hideDropDown = () => {
    this.setState({ showDropDown: false });
  };

  handleSubmit = (query) => {
    setTimeout(() => {
      if (this.props.history) {
        this.props.history.push(`/search?q=${query.q}`);
      }
    }, 500);
  };

  handleChange = (query) => {
    this.props.search({ q: query });
  };

  handleItemViewClicked = () => {
    // this.hideDropDown();
    this.updateSearchViewState('close');
  };

  updateSearchViewState = (state) => {
    const newState = { searchViewState: state };
    if (state === 'close') {
      newState.showDropDown = false;
    }
    this.setState({ ...newState });
  };

  getSearchResults = (results) => {
    let result = [];
    if (!results) return result;
    const { search: searchResult } = results;
    if (searchResult) {
      const end = Math.min(searchResult.length, 3);
      result = searchResult.slice(0, end);
    }

    return result;
  };

  getTagResults = (results) => {
    let result = [];
    if (!results) return result;
    const { tags } = results;
    if (tags) {
      const end = Math.min(tags.length, 3);
      result = tags.slice(0, end);
    }

    return result;
  };

  getBody = () => {
    const { results, error } = this.props;
    const searchResults = this.getSearchResults(results);
    const tagResults = this.getTagResults(results);
    const hasSearchResults = searchResults.length > 0;
    const hasTagResults = tagResults.length > 0;
    let body = null;
    if (!error) {
      body = (
        <Fragment>
          <CategoryHeader title={'Published Articles'}/>
          {
            hasSearchResults && searchResults.map((result, index) => (
              <ItemView
                onItemClicked={this.handleItemViewClicked}
                type='article' item={result} key={index}/>))
          }
          {
            !hasSearchResults && <EmptyItemView text={'No result found'}/>
          }
          <CategoryHeader title={'Tags'}/>
          {
            hasTagResults && tagResults.map((tag, index) => (
              <ItemView
                onItemClicked={this.handleItemViewClicked}
                type='tag' item={{ tag }} key={index}/>))
          }
          {
            !hasTagResults && <EmptyItemView text={'No result found'}/>
          }
        </Fragment>
      );
    }
    return body;
  };

  getErrorMessage = () => {
    const { error } = this.props;
    if (!error) {
      return error;
    }
    return error.message;
  };

  render() {
    const { loading } = this.props;
    const { showDropDown } = this.state;

    const display = (
      <SearchView
        viewState={this.state.searchViewState}
        disableSubmitButton={true}
        onQueryUpdated={this.handleChange}
        onViewStateUpdate={this.updateSearchViewState}
        onSubmit={this.handleSubmit}
        env='search-bar'/>
    );
    const header = (<MenuHeader errorMessage={this.getErrorMessage()} loading={loading}/>);
    const body = this.getBody();

    return (
      <NavBarDropDown
        menuHeader={header}
        show={showDropDown}
        menuBody={body}
        display={display}/>
    );
  }
}

SearchDropDown.propTypes = {
  children: PropTypes.any,
  results: PropTypes.object,
  error: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  search: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.search.loading,
  error: state.search.error,
  results: state.search.results,
  metadata: state.search.metadata
});

export default withRouter(connect(mapStateToProps, {
  search
})(SearchDropDown));
