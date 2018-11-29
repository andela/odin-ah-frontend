import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BigTagList.scss';

const BigTagList = ({ tags }) => tags.map(tag => (
    <div key={tag} className="popular-tags__item">
      <Link className="tag__text" to={`/tag/${tag}`}># {tag}</Link>
    </div>
));

BigTagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BigTagList;
