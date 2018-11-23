import React from 'react';
import { shallow } from 'enzyme';
import { CommentContainer } from '../../../components/comment/CommentContainer';
import CommentBox from '../../../components/comment/CommentBox';

describe('CommentContainer', () => {
  const slug = 'article-slug-2321';
  const user = {
    imageUrl: null
  };
  let sendComment;
  let sendingComment;
  let comments;
  let errors;
  let getComments;
  let resetRefresh;
  let showToast;
  beforeEach(() => {
    sendComment = jest.fn();
    sendingComment = false;
    comments = [];
    errors = [];
    getComments = jest.fn();
    resetRefresh = jest.fn();
    showToast = jest.fn();
  });
  it('should render without crashing', () => {
    const wrapper = shallow(
      <CommentContainer
        slug={slug}
        user={user}
        sendComment={sendComment}
        sendingComment={sendingComment}
        comments={comments}
        errors={errors}
        getComments={getComments}
        resetRefresh={resetRefresh}
        showToast={showToast}
      />
    );
    expect(wrapper.find(CommentBox)).toHaveLength(1);
  });
  it('should handle post comment when postCommentHandler is called', async () => {
    const postCommentHandlerSpy = jest.spyOn(CommentContainer.prototype, 'postCommentHandler');
    const sendResolveComment = jest.fn().mockImplementation(() => Promise.resolve(201));
    const wrapper = shallow(
        <CommentContainer
          slug={slug}
          user={user}
          sendComment={sendResolveComment}
          sendingComment={sendingComment}
          comments={comments}
          errors={errors}
          getComments={getComments}
          resetRefresh={resetRefresh}
          showToast={showToast}
        />
    );
    wrapper.setState({
      commentInput: 'Nice comment'
    });
    wrapper.update();
    await wrapper.instance().postCommentHandler();
    expect(postCommentHandlerSpy).toHaveBeenCalled();
    expect(sendResolveComment).toHaveBeenCalled();
    postCommentHandlerSpy.mockRestore();
  });
  it('should handle post comment when postCommentHandler is called and showToast when commentInput is empty', async () => {
    const postCommentHandlerSpy = jest.spyOn(CommentContainer.prototype, 'postCommentHandler');
    const wrapper = shallow(
        <CommentContainer
          slug={slug}
          user={user}
          sendComment={sendComment}
          sendingComment={sendingComment}
          comments={comments}
          errors={errors}
          getComments={getComments}
          resetRefresh={resetRefresh}
          showToast={showToast}
        />
    );
    await wrapper.instance().postCommentHandler();
    expect(postCommentHandlerSpy).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalled();
    postCommentHandlerSpy.mockRestore();
  });
  it('should handle refresh when comment is posted', () => {
    const wrapper = shallow(
        <CommentContainer
          slug={slug}
          user={user}
          sendComment={sendComment}
          sendingComment={sendingComment}
          comments={comments}
          errors={errors}
          getComments={getComments}
          resetRefresh={resetRefresh}
          showToast={showToast}
        />
    );
    wrapper.setProps({
      slug,
      refreshComments: true
    });
    expect(getComments).toHaveBeenCalledWith(slug);
    expect(resetRefresh).toHaveBeenCalled();
  });
  it('should handle onchange', () => {
    const onChangeSpy = jest.spyOn(CommentContainer.prototype, 'onChange');
    const wrapper = shallow(
        <CommentContainer
          slug={slug}
          user={user}
          sendComment={sendComment}
          sendingComment={sendingComment}
          comments={comments}
          errors={errors}
          getComments={getComments}
          resetRefresh={resetRefresh}
          showToast={showToast}
        />
    );
    const event = {
      target: {
        name: 'commentInput',
        value: 'newValue'
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state('commentInput')).toEqual(event.target.value);
    expect(onChangeSpy).toHaveBeenCalled();
    onChangeSpy.mockRestore();
  });
});
