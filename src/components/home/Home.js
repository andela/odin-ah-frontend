import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { ModalContent } from '../signup/modalComponent';
import { userLoginRequest, logout } from '../../redux/actions/auth/login';
import LoginModal from '../login/LoginModal';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
    };
  }

  handleLoginModal = () => {
    this.setState(state => ({ showLoginModal: !state.showLoginModal }));
  };

  openRegistrationModalComponent = () => {
    const content = {};
    content.Component = ModalContent;
    content.props = { registerUser: this.props.registerUser };
    this.props.openModal(content);
  };

  render() {
    return (
      <div>
        <h1>Home page</h1><br/><br/>
        <button className='button is-primary' id={'signupBtn'} onClick={this.openRegistrationModalComponent}>
          Sign up
        </button><br/>
        <br/>
        <button className='button is-primary' id={'loginBtn'} onClick={this.handleLoginModal}>Log in</button> <br />
        <LoginModal show={this.state.showLoginModal}
        close={this.handleLoginModal}
        userLoginRequest={this.props.userLoginRequest} /><br />
        <button className='button is-danger' onClick={this.props.handleLogout}>Log out</button>
      </div>
    );
  }
}

const propTypes = {
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.bool,
  handleLoginModal: PropTypes.func,
  handleLogout: PropTypes.func,
  userLoginRequest: PropTypes.func
};

Home.propTypes = propTypes;
export default connect(
  null,
  {
    openModal, registerUser, userLoginRequest, handleLogout: logout
  }
)(Home);
