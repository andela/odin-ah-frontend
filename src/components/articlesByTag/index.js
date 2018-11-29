import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleListView from '../articleList/ArticleListView';
import { getArticlesByTag } from '../../redux/actions/articles/articles';
import { logout } from '../../redux/actions/auth/login';
import PageLoader from '../PageLoader';
import './style.scss';
import Alert from '../notification/alert';

export class ArticlesByTag extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { match } = this.props;
    const { name } = match.params;
    this.props.getArticlesByTag(name);
  }

  render() {
    const { articles, match } = this.props;
    const { name } = match.params;
    return (
      <React.Fragment>
        <Alert/>
          {this.props.loading && <PageLoader text="Loading..." />}
          {!this.props.loading && (<section className="section">
          <div className='container article-tag '>
            <div className='columns'>
              <div className='column'>
                <div className='article-tag__box'>
                  <h2 className="article-tag__title">Tagged <span className="article-tag__name">{ name && name.charAt(0).toUpperCase() + name.slice(1)}</span></h2>
                  { articles.length ? <ArticleListView articles={articles}/>
                    : <div>No article with the tag &lsquo;{ name }&rsquo; was found</div> }
                </div>
              </div>
            </div>
          </div>
        </section>)}
      </React.Fragment>
    );
  }
}

ArticlesByTag.propTypes = {
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.array,
  match: PropTypes.object.isRequired,
  getArticlesByTag: PropTypes.func.isRequired,
  handleLogout: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.articlesByTag.loading,
  errors: state.articlesByTag.errors,
  articles: state.articlesByTag.articles
});

const mapDispatchToProps = {
  getArticlesByTag,
  handleLogout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesByTag);
