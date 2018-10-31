import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLoginRequest } from '../../redux/actions/auth/login';
import validateInput from './validations';
import './login.scss';
import SocialButton from '../signup/social';
import Alert from '../notification/alert';

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
      isAuthenticated: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {void}
   *
   * @memberof LoginModal
   * @param e
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
      this.props.userLoginRequest({
        email,
        password
      });
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
    const { errors } = this.state;
    if (this.state.isAuthenticated === true || !errors) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="login-modal">
        {this.props.show
        && <div className="modal is-active">
          <div className="modal-background"/>
          <div className="modal-content content">
            <div className="modal-card-body">
              <Link to={'/'}>
                <img className={'signup-logo-image'} alt={'Logo'} src="/assets/images/logo.jpg"/>
              </Link>
              <Alert/>
              <form onSubmit={this.onSubmit}>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-medium"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"/>
                  </span>
                  </div>
                  {
                    errors.email && <p className="help is-danger">{errors.email}</p>
                  }
                </div>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"/>
                  </span>
                  </div>
                  {
                    errors.password && <p className="help is-danger">{errors.password}</p>
                  }
                </div>
                <div className="field">
                  <div className="level">
                    <span className="checkbox level-right">
                      <Link to="/password/reset">Forgot Password?</Link>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button type="submit"
                            className={`button is-primary is-medium is-fullwidth signup-btn ${(this.props.loading) ? 'is-loading' : ''}`}>
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <br/>
              <br/>
              <SocialButton type={'signin'} social={'twitter'}/>
              <SocialButton type={'signin'} social={'facebook'}/>
              <SocialButton type={'signin'} social={'google'}/>
            </div>
          </div>
          <button onClick={this.props.close} className="modal-close is-large"
                  aria-label="close"/>
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
  loading: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  loading: state.login.loading
});
export default connect(mapStateToProps, { userLoginRequest })(LoginModal);
