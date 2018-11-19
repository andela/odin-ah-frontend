import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ResetPassword.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../../components/notification/alert';
import { resetRequestHandler, saveInputHandler } from '../../redux/actions/resetPassword';
import NavBarContainer from '../header/NavBarContainer';

export function ResetPasswordPage(props) {
  const { email, resetLoading, errors } = props.passwordResetData;
  let emailError;
  if (errors) {
    emailError = errors.email;
  }
  return (
    <div>
      <NavBarContainer />
      <div className="reset-field">
        <Alert />
        <div id="reset-info">
          Enter your email below and we will send you a link to reset your password.
        </div>
        <form
          id="sendEmailForm"
          onSubmit={(e) => {
            e.preventDefault();
            props.resetRequestHandler(email);
          }}
        >
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                className={`input is-medium ${emailError ? 'is-danger' : ''}`}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => props.saveInputHandler('email', e.target.value)}
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
    </div>
  );
}

ResetPasswordPage.propTypes = {
  passwordResetData: PropTypes.object,
  saveInputHandler: PropTypes.func,
  resetRequestHandler: PropTypes.func
};

const mapStateToProps = state => ({
  passwordResetData: state.passwordResetData || {}
});

export default connect(
  mapStateToProps,
  { resetRequestHandler, saveInputHandler }
)(ResetPasswordPage);
