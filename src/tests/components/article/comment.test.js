import { shallow } from 'enzyme/build';
import React from 'react';
import Comment from '../../../components/article/readArticle/comment';

test('should render ReadArticle component without crashing', async () => {
  shallow(<Comment />);
});
