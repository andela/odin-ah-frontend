import React from 'react';
import { shallow } from 'enzyme';
import { ArticlesByTag } from '../../../components/articlesByTag';
import PageLoader from '../../../components/PageLoader';
import ArticleListView from '../../../components/articleList/ArticleListView';

describe('ArticlesByTag', () => {
  const props = {
    loading: false,
    isAuthenticated: false,
    articles: [],
    match: {
      params: {
        name: 'Fashion'
      }
    },
    getArticlesByTag: jest.fn(),
    handleLogout: jest.fn()
  };

  const articles = [
    {
      slug: 'all-the-way-w3dAS423',
      title: 'I came all the way here',
      body: 'That is right'
    },
    {
      slug: 'as-time-goes-on-bggLag6B',
      title: 'As time goes on',
      body: 'It is all about'
    }
  ];

  it('should show PageLoader component when page is loading', () => {
    const wrapper = shallow(<ArticlesByTag {...{ ...props, loading: true }} />);
    expect(wrapper.find(PageLoader)).toHaveLength(1);
  });
  it('should display message when no articles with the named tag is available', () => {
    const wrapper = shallow(<ArticlesByTag { ...props } />);
    expect(wrapper.find(PageLoader)).toHaveLength(0);
    expect(wrapper
      .find(<div>No article with the tag &lsquo;{ props.match.params.name }&rsquo; was found</div>))
      .toHaveLength(0);
  });
  it('should display ArticleListView when article(s) with the named tag is available', () => {
    const wrapper = shallow(<ArticlesByTag { ...props } />);
    wrapper.setProps({
      articles
    });
    expect(wrapper.find(PageLoader)).toHaveLength(0);
    expect(wrapper.find(ArticleListView)).toHaveLength(1);
  });
});
