import React from 'react';
import PropTypes from 'prop-types';

const ArticleImage = ({ backgroundImageUrl, altText }) => {
  const styles = {
    background: backgroundImageUrl
      ? `url(${backgroundImageUrl})`
      : "url('http://picsum.photos/500')",
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: 'white',
    fontSize: '1.5em',
    height: '100%',
    padding: '20px'
  };
  return <div style={styles}>{!backgroundImageUrl && altText}</div>;
};

ArticleImage.propTypes = {
  backgroundImageUrl: PropTypes.string,
  altText: PropTypes.string.isRequired
};

export default ArticleImage;
