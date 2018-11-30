import React from 'react';
import ShareButton from 'react-social-share-buttons';
import PropTypes from 'prop-types';

const FacebookShareButton = ({ slug, imageUrl }) => (
    <div>
      <ShareButton
        compact
        socialMedia={'facebook'}
        url={`https://odin-ah-frontend-staging.herokuapp.com/article/${slug}/`}
        media={imageUrl}
        text="Sit by a lake"
      />
    </div>
);
FacebookShareButton.propTypes = {
  slug: PropTypes.string,
  imageUrl: PropTypes.string
};
export default FacebookShareButton;
