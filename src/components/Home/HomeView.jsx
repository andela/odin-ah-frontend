import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/HeaderContainer';
import './Home.scss';
import ArticleGridView from '../ArticleList/ArticleGridView';

const HomeView = props => (
    <div className="App">
      <Header isAuthenticated={false} />
      <div>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered title section-title">Top Articles</div>
            </div>
            <ArticleGridView articles={props.articles} />
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>&copy; Authors Haven 2018</p>
          </div>
        </footer>
      </div>
    </div>
);

HomeView.propTypes = {
  articles: PropTypes.array
};

export default HomeView;
