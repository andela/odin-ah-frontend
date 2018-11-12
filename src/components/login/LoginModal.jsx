import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validateInput from './validations';
import './login.scss';
import SocialButton from '../signup/social';
import Alert from '../notification/alert';
import { userLoginRequest } from '../../redux/actions/auth/login';
import Input from '../signup/Input';

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

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
        errors: {},
      }));
    }
  }

  update = (data) => {
    this.setState({ ...data });
  }

  render() {
    const { errors } = this.state;
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-modal">
        {this.props.show
        && <div className="modal is-active">
          <div className="modal-background"/>
          <div className="modal-content content">
            <div className="modal-card-body">
              <Link to={'/'}>
                <img className={'signup-logo-image'} alt={'Logo'} src="/assets/images/logo.png"/>
              </Link>
              <Alert/>
              <form id="loginForm" onSubmit={this.onSubmit} noValidate>
                <Input type='email' iconType='envelope' placeholder='Email' value={this.state.email}
                field='email' fieldError={errors.email} onUpdate={this.update}/>

                <Input type='password' iconType='lock' placeholder='Password' value={this.state.password}
                field='password' fieldError={errors.password} onUpdate={this.update}/>
                <div className="field">
                  <div className="control">
                    <button type="submit" id="loginBtn"
                            className={`button is-primary is-medium is-fullwidth signup-btn ${(this.props.loading) ? 'is-loading' : ''}`}>
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <br/>
              <div className="field">
                  <div className="level">
                    <span className="checkbox level-right">
                      <Link to="/reset-password">Forgot Password?</Link>
                    </span>
                  </div>
                </div>
                <br/>
                <hr/>
            <p>or sign up with one of these services</p>
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
  userLoginRequest: PropTypes.func,
  errors: PropTypes.shape({}),
  show: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  close: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  loading: state.login.loading,
  isAuthenticated: state.login.isAuthenticated,
  login: state
});

export default connect(mapStateToProps, { userLoginRequest })(LoginModal);
