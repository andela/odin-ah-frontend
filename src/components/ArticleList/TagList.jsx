import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TagList = ({ tags }) => (
    <React.Fragment>
      {tags.map(tag => (
        <Link key={tag} to={`/tags/${tag}`}>{`#${tag} `}</Link>
      ))}
    </React.Fragment>
);

TagList.propTypes = {
  tags: PropTypes.array.isRequired
};

export default TagList;
