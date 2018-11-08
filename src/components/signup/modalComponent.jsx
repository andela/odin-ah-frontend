import React from 'react';
import PropTypes from 'prop-types';
import Presentation from './presentation';

import './signup.scss';

/**
 * @return {null}
 */
export function ModalContent(props) {
  return (
    <section className="modal-card-body">
      <div className="content">
        <Presentation onSubmit={props.registerUser}/>
      </div>
    </section>
  );
}


ModalContent.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default ModalContent;
