import React from 'react';
import PropTypes from 'prop-types';

import './BigTagList.scss';

const BigTagList = ({ tags }) => tags.map(tag => (
    <div key={tag} className="popular-tags__item">
      <span className="tag__text"># {tag}</span>
    </div>
));

BigTagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BigTagList;
