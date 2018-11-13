import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ResetPassword.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveInput, sendResetRequest, inputError } from '../../redux/actions/resetPassword';
import Alert from '../../components/notification/alert';

export class ResetPasswordPage extends Component {
  render() {
    const { email, resetLoading, errors } = this.props.passwordResetData;
    const { saveInputHandler, resetRequestHandler } = this.props;
    let emailError;
    if (errors) {
      emailError = errors.email;
    }
    return (
      <div className="reset-field">
        <Alert />
        <div id="reset-info">
          Enter your email below and we'll send you a link to reset your password.
        </div>
        <form
          id="sendEmailForm"
          onSubmit={(e) => {
            e.preventDefault();
            resetRequestHandler(email);
          }}
        >
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                // className="input is-medium"
                className={`input is-medium ${emailError ? 'is-danger' : ''}`}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => saveInputHandler('email', e.target.value)}
              />
              <span className="icon is-medium is-left ">
                <i className="fas fa-envelope" />
              </span>
              {emailError && (
                <span className="icon is-small is-right has-text-danger">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
            {emailError && <p className="help is-danger">{emailError[0]}</p>}
          </div>

          <button
            id="resetPasswordBtn"
            className={`button is-primary is-medium is-fullwidth ${
              resetLoading ? 'is-loading' : ''
            }`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  saveInputHandler: PropTypes.func,
  resetRequestHandlereset: PropTypes.func
};

const mapStateToProps = state => ({
  passwordResetData: state.passwordResetData || {}
});

const mapDispatchToProps = dispatch => ({
  saveInputHandler: (field, value) => {
    dispatch(inputError(null));
    dispatch(saveInput(field, value));
  },
  resetRequestHandler: (email) => {
    dispatch(sendResetRequest({ email }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordPage);
