import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderView from './HeaderView';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const defaultProps = {
  isAuthenticated: false
};

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBurgerIsActive: false
    };
  }

  handleBurgerClick = () => {
    this.setState(state => ({ navBurgerIsActive: !state.navBurgerIsActive }));
  };

  render() {
    const { isAuthenticated } = this.props;
    const headerViewProps = {
      isAuthenticated,
      handleBurgerClick: this.handleBurgerClick,
      navBurgerIsActive: this.state.navBurgerIsActive
    };
    return <HeaderView {...headerViewProps} />;
  }
}

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

export default connect(mapStateToProps)(HeaderContainer);
