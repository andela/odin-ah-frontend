import React, { Component } from 'react';
import './ResetPassword.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../notification/alert';
import { completeResetRequest, saveInputHandler } from '../../redux/actions/resetPassword';

export class ResetPasswordForm extends Component {
  render() {
    const {
      password, confirmPassword, confirming, message, errors
    } = this.props.passwordResetData;
    const { history } = this.props;
    if (message === 'Success Message') {
      setTimeout(() => {
        history.push('/?login');
      }, 500);
    }
    const { token } = this.props.match.params;
    let passwordError;
    let confirmPasswordError;
    if (errors) {
      passwordError = errors.password;
      confirmPasswordError = errors.confirmPassword;
    }
    return (
      <div>
        <div className="reset-field">
          <Alert/>
          <h1>Reset Password Form</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.props.completeResetRequest({
                password,
                confirmPassword,
                token
              });
            }}
          >
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${passwordError ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => this.props.saveInputHandler('password', e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"/>
                </span>
                {passwordError && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"/>
                  </span>
                )}
              </div>
              {passwordError && <p className="help is-danger">{passwordError[0]}</p>}
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${confirmPasswordError ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={e => this.props.saveInputHandler('confirmPassword', e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"/>
                </span>
                {confirmPasswordError && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"/>
                  </span>
                )}
              </div>
              {confirmPasswordError && <p className="help is-danger">{confirmPasswordError[0]}</p>}
            </div>

            <button id="resetPasswordBtn"
                    className={`button is-primary is-medium is-fullwidth ${
                      confirming ? 'is-loading' : ''
                    }`}
                    type="submit"
                    value="Reset password"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  match: PropTypes.object,
  passwordResetData: PropTypes.object,
  saveInputHandler: PropTypes.func,
  completeResetRequest: PropTypes.func,
  resetRequestHandler: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  passwordResetData: state.passwordResetData || {}
});

export default connect(
  mapStateToProps, {
    saveInputHandler,
    completeResetRequest
  }
)(ResetPasswordForm);
