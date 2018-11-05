import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeView from './HomeView';
import { fetchArticles } from '../../redux/actions/home';

class HomeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    return <HomeView articles={this.props.articles} />;
  }
}

HomeContainer.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array
};

const mapStateToProps = state => ({
  articles: state.home.articles
});

const mapDispatchToProps = {
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
