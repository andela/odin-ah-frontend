import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderView from './HeaderView';
import { modal } from '../../redux/actions/modal';
import { ModalContent } from '../signup/modalComponent';
import { registerUser } from '../../redux/actions/auth/register';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const defaultProps = {
  isAuthenticated: false
};

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBurgerIsActive: false,
      showLoginModal: false,
    };
  }

  openRegistrationModalComponent = () => {
    const content = {};
    content.Component = ModalContent;
    content.props = { registerUser: this.props.registerUser, test: 'No you see me' };
    this.props.openModal(content);
  };

  handleBurgerClick = () => {
    this.setState(state => ({ navBurgerIsActive: !state.navBurgerIsActive }));
  };

  handleLoginClick = () => {
    this.setState(state => ({ showLoginModal: !state.showLoginModal }));
  };

  handleLoginCloseClick = () => {
    this.setState(state => ({ showLoginModal: !state.showLoginModal }));
  };

  render() {
    const { isAuthenticated } = this.props;
    const headerViewProps = {
      isAuthenticated,
      handleBurgerClick: this.handleBurgerClick,
      navBurgerIsActive: this.state.navBurgerIsActive,
      openRegisterModal: this.openRegistrationModalComponent,
      handleLoginClick: this.handleLoginClick,
      showLoginModal: this.state.showLoginModal,
      handleLoginCloseClick: this.handleLoginCloseClick
    };
    return <HeaderView {...headerViewProps} />;
  }
}

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.login.isAuthenticated,
    result: state.registration.result,
  };
}
const mapDispatchToProps = dispatch => ({
  openModal: data => dispatch(modal(true, data)),
  registerUser: user => dispatch(registerUser(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
