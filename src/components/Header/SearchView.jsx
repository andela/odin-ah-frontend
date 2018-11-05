import React from 'react';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      active: !state.active
    }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar-item">
          <input
            type="text"
            name="search"
            placeholder="Search.."
            className="input is-primary navbar-search"
            style={{ visibility: this.state.active ? 'visible' : 'hidden' }}
          />
        </div>
        <div className="navbar-item">
          <span className="icon is-medium navbar-icon" onClick={this.handleClick}>
            <i className="fas fa-search fa-2x" />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchView;
