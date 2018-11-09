import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resendVerificationLink, verifyToken } from '../../redux/actions/auth/verify';
import PageLoader from '../PageLoader';

export class VerifyEmail extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { token } = match.params;
    this.props.verifyToken(token);
  }

  render() {
    const { error, result, verifying } = this.props;
    return (
      <div>
         {verifying && <PageLoader text={'Verifying Email'}/>}
         {!verifying && error && <Redirect to={'/email-verification/resend'}/>}
          {!verifying && result && <Redirect to={'/'}/>}
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.any,
  verifyToken: PropTypes.func.isRequired,
  resendVerificationLink: PropTypes.func.isRequired,
  verifying: PropTypes.bool,
  error: PropTypes.any,
  result: PropTypes.any,
};

VerifyEmail.defaultProps = {};


const mapStateToProps = state => ({
  verifying: state.verify.verifying,
  error: state.verify.error,
  result: state.verify.result,
});


export default connect(mapStateToProps, {
  verifyToken,
  resendVerificationLink
})(VerifyEmail);
