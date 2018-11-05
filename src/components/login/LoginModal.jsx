import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLoginRequest } from '../../redux/actions/auth/login';
import validateInput from './validations';
import './login.scss';
/**
 * login compontent
 *
 * @class LoginModal
 * @extends {React.Component}
 */
export class LoginModal extends Component {
/**
   * Creates an instance of the login modal.
   * @param {any} props
   * @memberof LoginModal
   */

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {any}
   * @memberof LoginModal
   */
  onSubmit(e) {
    e.preventDefault();
    const { errors } = validateInput(this.state);
    const { email, password } = this.state;
    if (errors.email || errors.password) {
      this.setState(() => ({
        errors
      }));
    } else {
      this.props.userLoginRequest({ email, password });
      this.setState(() => ({
        redirect: true,
        errors: {}
      }));
    }
  }

  /**
   *
   * @returns {void}
   * @param {any} e
   * @memberof LoginModal
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {void}
   * @memberof LoginModal
   */
  render() {
    const { errors, redirect } = this.state;
    if (this.state.redirect === true || !errors) {
      return <Redirect to="/" />;
    }
    return (
     <div className="login-modal">
        {
          redirect ? <div color="#a7fd069a" text-align="center"> Signing you in... <br /></div> : ''
          }
        {this.props.show
          && <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
                    <h3 className="login-heading">Authors Haven</h3>
        <form onSubmit={this.onSubmit} >
          <div className="field" error={errors.email}>
            <div className="control has-icons-left has-icons-right">
              <input
              className="input is-medium"
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
            {
              errors.email && <p className="help is-danger">{errors.email}</p>
            }
          </div>
          <div className="field" error={errors.password}>
            <div className="control has-icons-left">
              <input
              className="input is-medium"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            {
              errors.password && <p className="help is-danger">{errors.password}</p>
            }
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-success is-medium login-button">
                Login
              </button>
            </p>
            <div className="field">
              <p className="control login-heading"><Link to="/password/reset" >Forgot Password?</Link></p>
            </div>
          </div>
        </form>
        </div>
          <button onClick={this.props.close} className="modal-close is-large" aria-label="close"></button>
        </div>
        }
      </div>
    );
  }
}
LoginModal.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { userLoginRequest })(LoginModal);
