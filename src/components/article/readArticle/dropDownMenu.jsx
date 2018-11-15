import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentWillUnmount() {
    this.removeWindowEvent();
  }

  handler = (event) => {
    const { current } = this.ref;
    if (!event.target.matches('.side-tool__item__icon_show-more')) {
      current.classList.remove('open');
      this.removeWindowEvent();
    }
  };

  removeWindowEvent() {
    window.removeEventListener('click', this.handler);
  }

  onToggleClick = () => {
    const { current } = this.ref;
    if (!current.classList.contains('open')) {
      current.classList.add('open');
    } else {
      current.classList.remove('open');
    }
    window.addEventListener('click', this.handler);
  };

  onDropDownItemClicked = (e) => {
    const item = e.target.getAttribute('data-action');
    this.props.onDropDownItemClicked(item);
  };

  render() {
    return (
      <div title='More Options' className="drop-down">
        <span
          id='toggleBtn'
          data-action="toggle"
          onClick={this.onToggleClick} title='more option'
          className='side-tool__item__icon side-tool__item__icon_show-more'/>
        <ul ref={this.ref} className="drop-down-menu">
          {
            this.props.dropDownItems.map(item => (
              <li key={item}>
                <span onClick={this.onDropDownItemClicked} data-action={item}>{item}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  dropDownItems: PropTypes.array.isRequired,
  onDropDownItemClicked: PropTypes.func.isRequired
};

DropDownMenu.defaultProps = {};
