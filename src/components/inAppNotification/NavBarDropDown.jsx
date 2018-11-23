import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NavBarDropDown extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.dropDownMenu = React.createRef();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.onToggleClick(newProps.show);
  }

  componentWillUnmount() {
    this.removeWindowEvent();
  }

  isChild = (e) => {
    let { target } = e;
    const wrapper = this.wrapper.current;

    while (target !== wrapper && target !== document) {
      target = target.parentNode;
      if (target === wrapper) return true;
    }
    return false;
  };

  handler = (event) => {
    const { current } = this.dropDownMenu;
    const dismiss = this.props.onClose || (() => {});
    if (current.classList.contains('show') && !this.isChild(event)) {
      current.classList.remove('show');
      dismiss();
      this.removeWindowEvent();
    }
  };

  removeWindowEvent() {
    window.removeEventListener('click', this.handler);
  }

  onToggleClick = (show) => {
    const { current } = this.dropDownMenu;
    if (show) {
      current.classList.add('show');
      window.addEventListener('click', this.handler);
    } else {
      this.removeWindowEvent();
      current.classList.remove('show');
    }
  };

  render() {
    const showDropdown = this.props.show;
    const show = (showDropdown) ? 'show' : '';
    const { menuBody } = this.props;
    const hasBody = !!menuBody;
    return (
      <div ref={this.wrapper} className="dropdowns-wrapper">
        <div className="dropdown-container">
          <div className="dropdown dd-trigger">
            {this.props.display}
          </div>
          <div ref={this.dropDownMenu} className={`dropdown-menu animated ${show}`}>
            <div className='dropdown-arrow'/>
            <div className="dropdown-header">
              {
                this.props.menuHeader
              }
            </div>

            <div className="dropdown-body">
              {
                hasBody && menuBody
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
  menuBody: PropTypes.any,
  onClose: PropTypes.func,
};
