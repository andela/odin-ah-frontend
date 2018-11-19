import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resendVerificationLink } from '../../redux/actions/auth/verify';
import ReVerificationForm from './reVerificationForm';
import Alert from '../notification/alert';

export function ReVerifyEmail(props) {
  return (
    <div>
      <Alert/>
      <ReVerificationForm
        loading={props.loading}
        onSubmit={props.resendVerificationLink}/>
    </div>
  );
}

ReVerifyEmail.propTypes = {
  resendVerificationLink: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  loading: state.verify.loading,
});

ReVerifyEmail.defaultProps = {};

export default connect(mapStateToProps, {
  resendVerificationLink
})(ReVerifyEmail);
