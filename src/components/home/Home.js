import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modal } from '../../redux/actions/modal';
import ModalContent from '../signup/modalComponent';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.openRegisterModalComponent = this.openRegisterModalComponent.bind(this);
  }

  openRegisterModalComponent() {
    const content = {};
    content.Component = ModalContent;
    content.props = {};
    this.props.openModal(content);
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to='/register'>Login user</Link>
        <Link to='/register'>Login user</Link>
        <button id={'signupBtn'} onClick={this.openRegisterModalComponent}>Lunch Sign up box</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: data => dispatch(modal(true, data))
});

Home.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Home));
