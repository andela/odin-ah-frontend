import React from 'react';
import PropTypes from 'prop-types';

const FollowButtonView = ({
  text, styles, loading, onClickHandler
}) => (
  <div className="js-button-wrapper" styles={styles} onClick={onClickHandler}>
    {!loading ? text : <i className="fas fa-sync fa-spin" />}
  </div>
);

FollowButtonView.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.object,
  loading: PropTypes.bool,
  onClickHandler: PropTypes.func
};

FollowButtonView.defaultProps = {
  loading: false,
  styles: {},
  text: 'Follow'
};

export default FollowButtonView;
