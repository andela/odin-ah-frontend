import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class EmptyItemView extends Component {
  render() {
    const { text } = this.props;

    return (
      <div className='search-item-wrapper'>
        <div className='content'>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

EmptyItemView.propTypes = {
  text: PropTypes.string.isRequired,
};

EmptyItemView.defaultProps = {};
