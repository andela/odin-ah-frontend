import React from 'react';
import { shallow } from 'enzyme';

import ArticleListView from '../../../components/articleList/ArticleListView';

const article = {
  slug: 'how-i-started-my-career-in-tech-TjDRjIJJ',
  title: 'How I started my career in Tech',
  body: 'Orci varius natoqu',
  description: 'Orci varius natoque penatibus.',
  imageUrl: null,
  readingTime: '22500',
  isPublished: false,
  isPrivate: false,
  createdAt: '2018-10-15T17:20:38.738Z',
  tags: [],
  author: {
    username: 'hammed',
    name: 'Jane Doe',
    bio: null,
    imageUrl: null
  },
  reaction: {
    likeCount: 0,
    dislikeCount: 0
  }
};

const article2 = { ...article, slug: 'a-distinct-slug' };

const articleList = [article, article2];

it('renders without crashing', () => {
  const wrapper = shallow(<ArticleListView articles={articleList} />);
  expect(wrapper.exists()).toBe(true);
});
