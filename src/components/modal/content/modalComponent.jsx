import React from 'react';
import PropTypes from 'prop-types';
import Presentation from '../../signup/presentation';

import '../../signup/signup.scss';

/**
 * @return {null}
 */
export function ModalContent(props) {
  return (
    <div className="content">
      <Presentation onSubmit={props.registerUser}/>
    </div>
  );
}


ModalContent.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default ModalContent;
