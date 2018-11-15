import React from 'react';
import { connect } from 'react-redux';

import HeaderView from './HeaderView';

const propTypes = {};

const defaultProps = {};

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return <HeaderView {...this.props} />;
  }
}

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

export default connect()(HeaderContainer);
