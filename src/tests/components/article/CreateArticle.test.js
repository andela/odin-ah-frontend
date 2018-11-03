import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { CreateArticle } from '../../../components/article/createArticle/createArticle';

describe('CreateArticleComponent', () => {
  it('should render CreateArticle component without crashing', (done) => {
    const mockCreatemethod = sinon.spy();
    const wrapper = shallow(<CreateArticle
      createArticleRequest={mockCreatemethod}
    />);
    expect(wrapper);
    done();
  });

  // it('should display errors when form inputs are invalid');

  // it('should publish article when form inputs are valid');
});
