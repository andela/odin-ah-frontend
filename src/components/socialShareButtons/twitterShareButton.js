import React from 'react';
import ShareButton from 'react-social-share-buttons';
import PropTypes from 'prop-types';

const TwitterShareButton = ({ slug }) => (
  <div>
    <ShareButton
      compact
      socialMedia={'twitter'}
      url={`https://odin-ah-frontend-staging.herokuapp.com/article/${slug}/`}
      text="Author's Haven"
    />
  </div>
);

TwitterShareButton.propTypes = {
  slug: PropTypes.string,
};
export default TwitterShareButton;
