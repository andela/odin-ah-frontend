import LoginModalContent from '../../components/modal/content/LoginModalContent';
import ModalContent from '../../components/modal/content/modalComponent';
import { userLoginRequest } from './auth/login';
import { registerUser } from './auth/register';

export const SHOW_MODAL = 'SHOW_MODAL';

/**
 *
 * @param show
 * @param { {Component: Component, props: object} } content
 * @return {{type: string, show: *, content: object}}
 */
export const modal = (show, content = {}) => ({
  type: SHOW_MODAL,
  show,
  content,
});

export const dismissModal = (timeout = null) => (dispatch) => {
  if (timeout) {
    setTimeout(() => {
      dispatch(modal(false));
    }, timeout);
  } else {
    dispatch(modal(false));
  }
};

export const openModal = content => dispatch => dispatch(modal(true, content));


export const handleUserLogin = dispatch => (data) => {
  dispatch(userLoginRequest(data));
};

export const handleRegisterUser = dispatch => (data) => {
  dispatch(registerUser(data));
};

export const handleModalDismiss = dispatch => (timeout) => {
  dispatch(dismissModal(timeout));
};

export const openLoginModal = () => (dispatch) => {
  const content = {};
  content.Component = LoginModalContent;
  content.props = {
    userLoginRequest: handleUserLogin(dispatch),
    dismissModal: handleModalDismiss(dispatch)
  };
  dispatch(openModal(content));
};

export const openRegistrationModal = () => (dispatch) => {
  const content = {};
  content.Component = ModalContent;

  content.props = {
    registerUser: handleRegisterUser(dispatch),
    dismissModal: handleModalDismiss(dispatch)
  };
  dispatch(openModal(content));
};
