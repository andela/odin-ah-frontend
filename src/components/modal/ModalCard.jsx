import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../notification/alert';

import './styles.scss';

class ModalCard extends Component {
  render() {
    return (
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title">
            <Link to={'/'}>
              <img className='modal-logo-image' alt={'Logo'} src="/assets/images/logo.png"/>
            </Link>
          </div>
          <button onClick={this.props.dismiss} className="delete" aria-label="close"/>
        </header>
        <section className="modal-card-body">
          <Alert/>
          <Fragment>
            {
              this.props.children
            }
          </Fragment>
        </section>
      </div>
    );
  }
}

ModalCard.propTypes = {
  children: PropTypes.any,
  dismiss: PropTypes.func,
};

ModalCard.defaultProps = {};

export default ModalCard;
