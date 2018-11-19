import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dismissModal } from '../../redux/actions/modal';
import ModalCard from './ModalCard';

export class Modal extends Component {
  dismissBtn = () => {
    this.props.dismissModal();
  };

  render() {
    const Content = this.props.content.Component;
    const { props } = this.props.content;
    const { show } = this.props;
    if (!Content) return null;
    return (
      <React.Fragment>
        <div className={`modal ${(show) ? 'is-active' : ''}`}>
          <div className="modal-background"/>
          <ModalCard dismiss={this.dismissBtn}>
            <Content {...props}/>
          </ModalCard>
        </div>
      </React.Fragment>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.shape({
    Component: PropTypes.any,
    props: PropTypes.any,
  }),
  show: PropTypes.bool,
  dismissModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  content: {
    props: {}
  },
  show: true,
};

const mapStateToProps = state => ({
  show: state.modal.show,
  content: state.modal.content,
});

export default connect(mapStateToProps, { dismissModal })(Modal);
