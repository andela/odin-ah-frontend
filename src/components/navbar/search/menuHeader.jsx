import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class MenuHeader extends Component {
  render() {
    const { loading, errorMessage, summary } = this.props;
    return (
      <Fragment>
        {loading && <i className="fas fa-spinner fa-pulse"/>}
        {
          loading && <span>Searching</span>
        }
        {
          !loading && !errorMessage && <span>Search result: {summary}</span>
        }
        {
          !loading && errorMessage && <span className="error-msg">{errorMessage}</span>
        }
      </Fragment>
    );
  }
}

MenuHeader.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  summary: PropTypes.string,
};

MenuHeader.defaultProps = {};
