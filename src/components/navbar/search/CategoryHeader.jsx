import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const CategoryHeader = props => (
    <Fragment>
      <div className='search-cat'>
        <p >{props.title}</p>
      </div>
    </Fragment>
);

CategoryHeader.propTypes = {
  title: PropTypes.string
};

CategoryHeader.defaultProps = {};

export default CategoryHeader;
