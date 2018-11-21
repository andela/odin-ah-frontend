import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReadArticleComponent, { ReadArticle } from '../../../components/article/readArticle';
import SideTool from '../../../components/article/readArticle/sideTool';
import ArticleContent from '../../../components/article/readArticle/articleContent';
import ProfileView from '../../../components/article/readArticle/profileView';
import TagPill from '../../../components/article/readArticle/tagPill';
import TagPillContainer from '../../../components/article/readArticle/tagPillContainer';
import DropDownMenu from '../../../components/article/readArticle/dropDownMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const match = {
  params: {
    slug: 'test-slug',
  }
};
const article = {
  title: '',
  body: '',
  author: {
    username: '',
    name: '',
    imageUrl: ''
  },
  tags: ['test'],
  parsedDate: '',
  readingTime: 0,
  reaction: {
    commentCount: 0,
    dislikeCount: 0,
    likeCount: 0
  }
};
describe('ReadArticle Component', () => {
  test('should render SideTool component without crashing', () => {
    const mockOnDropDownItemClickedFunc = jest.fn();
    const { reaction } = article;
    shallow(<SideTool dropDownItems={[]}
                      onDropDownItemClicked={mockOnDropDownItemClickedFunc}
                      reaction={reaction}/>);
  });
  test('should render ArticleContent component without crashing', () => {
    const mockOnDropDownItemClickedFunc = jest.fn();

    shallow(<ArticleContent
      dropDownItems={[]}
      onDropDownItemClicked={mockOnDropDownItemClickedFunc}
      article={article}/>);
  });
  test('should render ProfileView component without crashing', () => {
    const props = {
      user: article.author,
      date: '',
      readTime: 0,
    };
    shallow(<ProfileView {...props} />);
  });
  test('should render TagPill component without crashing', () => {
    const props = {
      name: '',
    };
    shallow(<TagPill {...props} />);
  });
  test('should render TagPillContainer component without crashing', () => {
    const props = {
      tags: [''],
    };
    shallow(<TagPillContainer {...props} />);
  });

  describe('DropDownMenu component', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = {
        onDropDownItemClicked: jest.fn(),
        dropDownItems: ['test'],
      };
      wrapper = mount(<DropDownMenu {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    test('should be able to toggle drop down', () => {
      const invalidHandlerSpy = jest.spyOn(wrapper.instance(), 'onToggleClick');
      wrapper.instance()
        .forceUpdate();
      wrapper.find('[data-action="toggle"]')
        .simulate('click', {
          target: {}
        });
      expect(invalidHandlerSpy)
        .toBeCalled();
      wrapper.find('[data-action="toggle"]')
        .simulate('click', {
          target: {}
        });

      expect(invalidHandlerSpy.mock.calls.length)
        .toBe(2);
    });
    test('should render DropDownMenu component without crashing', () => {
      const instance = wrapper.instance();
      const matches = jest.fn();
      const event = {
        target: {
          matches
        }
      };
      matches.mockReturnValueOnce(true);
      instance.handler(event);
      expect(matches)
        .toBeCalled();

      matches.mockReturnValueOnce(false);
      instance.handler(event);
      expect(matches.mock.calls.length)
        .toBe(2);
    });

    test('should render DropDownMenu component without crashing', () => {
      const instance = wrapper.instance();
      const getAttribute = jest.fn();
      const event = {
        target: {
          getAttribute
        }
      };
      getAttribute.mockReturnValueOnce('test');
      instance.onDropDownItemClicked(event);
      expect(getAttribute)
        .toBeCalled();
      expect(getAttribute.mock.calls.length)
        .toBe(1);
      expect(props.onDropDownItemClicked)
        .toBeCalled();
    });
  });
  describe('ReadArticle component', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      const mockGetArticles = jest.fn();
      const mockDeleteArticles = jest.fn();
      const mockGetComments = jest.fn();
      const mockRedirect = jest.fn();
      const mockOpenLoginModal = jest.fn();
      const mockBookMarkArticle = jest.fn();
      const loggedInUser = {
        username: ''
      };
      props = {
        match,
        article,
        loggedInUser,
        isAuthenticated: true,
        redirect: mockRedirect,
        getArticle: mockGetArticles,
        getComments: mockGetComments,
        openLoginModal: mockOpenLoginModal,
        deleteArticle: mockDeleteArticles,
        bookMarkArticle: mockBookMarkArticle,
      };
      wrapper = shallow(
        <ReadArticle
          registerUser={jest.fn()}
          openModal={jest.fn()}
          {...props}/>
      );
    });
    test('should render ReadArticle component without crashing', async () => {
      expect(props.getArticle)
        .toBeCalled();
      expect(props.getComments)
        .toBeCalled();
    });

    test('ReadArticle onDropDownClicked', () => {
      const instance = wrapper.instance();
      instance.onDropDownItemClicked('Default');
      expect(props.redirect)
        .not
        .toBeCalled();
      expect(props.deleteArticle)
        .not
        .toBeCalled();
      instance.onDropDownItemClicked('Edit');
      expect(props.redirect)
        .toBeCalled();
      instance.onDropDownItemClicked('Delete');
      expect(props.deleteArticle)
        .toBeCalled();
    });
    test('ReadArticle handleBookmark', () => {
      const instance = wrapper.instance();
      instance.handleBookmark();
      expect(props.openLoginModal).toHaveBeenCalledTimes(0);
    });

    test('should render ReadArticle component without article', () => {
      const mockCreateMethod = jest.fn();
      shallow(
        <ReadArticle
          match={match}
          registerUser={jest.fn()}
          openModal={jest.fn()}
          getArticle={mockCreateMethod}
          getComments={mockCreateMethod}/>
      );
    });
    test('should render 404 Page', () => {
      const mockCreateMethod = jest.fn();
      shallow(
        <ReadArticle
          registerUser={jest.fn()}
          openModal={jest.fn()}
          errorCode={404}
          match={match}
          getArticle={mockCreateMethod}
          getComments={mockCreateMethod}/>
      );
    });
    test('should redirect user', () => {
      const mockCreateMethod = jest.fn();
      const redirectTo = { to: '/' };
      shallow(
        <ReadArticle
          registerUser={jest.fn()}
          openModal={jest.fn()}
          match={match}
          redirectTo={redirectTo}
          getArticle={mockCreateMethod}
          getComments={mockCreateMethod}/>
      );
    });
    test('should render with store attached', () => {
      const initialState = {
        articles: {
          article,
          statusCode: 200,
          response: {}
        },
        login: {
          isAuthenticated: true,
          user: {}
        },
        redirect: {}
      };
      let store = mockStore(initialState);
      shallow(
        <ReadArticleComponent {...{
          ...props,
          store
        }}/>
      );
      initialState.articles.article = null;
      initialState.login.user = article.author;
      store = mockStore(initialState);
      shallow(
        <ReadArticleComponent {...{
          ...props,
          store
        }}/>
      );
    });
  });
});
