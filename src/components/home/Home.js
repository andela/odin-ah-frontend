import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { ModalContent } from '../signup/modalComponent';

export class Home extends Component {
  openRegistrationModalComponent = () => {
    const content = {};
    content.Component = ModalContent;
    content.props = { registerUser: this.props.registerUser, test: 'No you see me' };
    this.props.openModal(content);
  };

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to='/login'>Login user</Link>
        <button id={'signupBtn'} onClick={this.openRegistrationModalComponent}>
          Sign up
        </button>
      </div>
    );
  }
}

const propTypes = {
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};


Home.propTypes = propTypes;
export default connect(null, { openModal, registerUser })(Home);
