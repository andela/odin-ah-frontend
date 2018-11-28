import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

import './search.scss';

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.query || '',
      hasFocus: this.props.autofocus,
    };
    this.ref = createRef();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.viewState === 'close' && this.isVisible()) {
      this.setState({ search: '' });
      this.hideView();
    }
  }

  onKeyPressed = (event) => {
    this.executeFunc(() => {
    }, 'a', 2, 12);
    if (event.which === 13 || event.keyCode === 13) {
      event.preventDefault();
      if (!this.props.disableSubmitButton) {
        this.hideOrShowSearchBar('');
        this.handleSubmit();
      }
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { search: q } = this.state;
    const isSearchVisible = this.hideOrShowSearchBar(q);
    if (!this.props.disableSubmitButton) {
      if (isSearchVisible && q.length) {
        this.handleSubmit();
        this.hideOrShowSearchBar('');
      }
    }
  };

  handleSubmit = () => {
    const { search: q } = this.state;
    this.executeFunc(this.props.onSubmit, { q });
  };

  hideView = () => {
    const searchInput = this.ref.current;
    this.setState({ hasFocus: false });
    searchInput.classList.add('remove');
    searchInput.classList.remove('focus');
    searchInput.blur();
    setTimeout(() => {
      searchInput.classList.remove('remove');
    }, 500);
    this.executeFunc(this.props.onViewClosed);
    this.executeFunc(this.props.onViewStateUpdate, 'close');
  };

  showView = () => {
    const searchInput = this.ref.current;
    searchInput.classList.add('focus');
    setTimeout(() => {
      searchInput.focus();
    }, 100);
    this.executeFunc(this.props.onViewStateUpdate, 'open');
  };

  hideOrShowSearchBar(q) {
    const isSearchVisible = this.isVisible();

    if (!isSearchVisible) {
      this.showView();
    } else if (!(q.length)) {
      this.hideView();
    }
    return isSearchVisible;
  }

  isVisible = () => {
    const searchInput = this.ref.current;
    return searchInput && searchInput.classList.contains('focus');
  };

  updateState = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
    this.executeFunc(this.props.onQueryUpdated, value);
  };

  onBlur = () => {
    const { search: q } = this.state;
    this.hideOrShowSearchBar(q);
    this.executeFunc(this.props.onBlur);
  };

  executeFunc = (fn, ...args) => {
    if (!fn) return;
    let argsList = args;
    if (!args) argsList = [];
    fn(...argsList);
  };

  render() {
    const { env } = this.props;
    return (
      <div className={`search-view ${env}`}>
        <form>
          <input
            autoFocus={this.state.hasFocus}
            ref={this.ref} className='search-input'
            onChange={this.updateState} onKeyDown={this.onKeyPressed}
            onBlur={this.onBlur} value={this.state.search}
            id={`${env}_search`} name="q" type="text"
            placeholder="Search Authors Haven" autoComplete="off"/>
          <button
            onClick={this.onSubmit} title={'search'}
            className='search-icon' id={`${env}_search_submit`} type="button"/>
        </form>
      </div>
    );
  }
}

SearchView.propTypes = {
  query: PropTypes.string,
  autofocus: PropTypes.bool,
  disableSubmitButton: PropTypes.bool,
  viewState: PropTypes.oneOf(['open', 'close']),
  env: PropTypes.oneOf(['search-bar', 'page']),
  onQueryUpdated: PropTypes.func,
  onViewClosed: PropTypes.func,
  onViewStateUpdate: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

SearchView.defaultProps = {
  env: 'page',
  hasFocus: false,
  disableSubmitButton: false,
};

export default SearchView;
