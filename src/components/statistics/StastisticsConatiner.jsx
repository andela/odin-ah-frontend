import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StastisticsView from './StastisticsView';
import { fetchStatistics } from '../../redux/actions/statistics';


export class StastisticsConatiner extends Component {
    componentDidMount() {
      this.props.fetchStatistics();
    }

render() {
  return <StastisticsView {...this.props}/>;
}
}


StastisticsConatiner.propTypes = {
  fetchStatistics: PropTypes.func,
};

const mapStateToProps = state => ({
  statistics: state.statistics.data
});


const mapDispatchToProps = {
  fetchStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(StastisticsConatiner);
