import React, { Component } from 'react';

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let toScroll = windowScroll;
    if (windowScroll < 80) {
      toScroll = 0;
    }
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (toScroll / height) * 100;
    this.ref.current.style.width = `${scrolled}%`;
  };

  render() {
    return (
        <div className="progress-container">
          <div className="progress-bar" ref={this.ref} />
        </div>
    );
  }
}
export default ScrollBar;
