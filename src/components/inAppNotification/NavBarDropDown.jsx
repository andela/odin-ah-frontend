import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NavBarDropDown extends Component {
  render() {
    const show = (this.props.show) ? 'show' : '';
    return (
      <div className="dropdowns-wrapper">  
        <div className="dropdown-container">
          <div className="dropdown dd-trigger">
            {this.props.display}
          </div>
          <div className={`dropdown-menu animated ${show}`}>
            <div className='dropdown-arrow'/>
            <div className="dropdown-header">
              {
                this.props.menuHeader
              }
            </div>

            <div className="dropdown-body">
              {
                this.props.menuBody
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBarDropDown.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
  display: PropTypes.any.isRequired,
  menuHeader: PropTypes.any,
  menuBody: PropTypes.any.isRequired,
};

NavBarDropDown.defaultProps = {};
