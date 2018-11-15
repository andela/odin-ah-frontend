import React from 'react';
import { shallow, mount } from 'enzyme';
import { UpdateArticle } from '../../../../components/article/updateArticle/updateArticle';
import PublishContainer from '../../../../components/article/Editor/PublishContainer';
import TitleInput from '../../../../components/article/Editor/TitleInput';
import BodyInput from '../../../../components/article/Editor/BodyInput';
import PageNotFound from '../../../../components/404/PageNotFound';
import uploadArticleImage from '../../../../services/cloudinary';

jest.mock('../../../../services/cloudinary');

describe('UpdateArticle Component', () => {
  let publishArticle;
  let openPublishModal;
  let closePublishModal;
  let showDialog;
  let loading;
  let showError;
  let hideError;
  let errors;
  let responseMessage;
  let getArticle;
  let match;
  beforeEach(() => {
    publishArticle = jest.fn();
    openPublishModal = jest.fn();
    closePublishModal = jest.fn();
    showDialog = false;
    loading = false;
    showError = jest.fn();
    hideError = jest.fn();
    errors = {
    };
    responseMessage = '';
    getArticle = jest.fn();
    match = {
      params: {
        slug: 'my-article-44532k'
      }
    };
  });
  it('should render without crashing', (done) => {
    const wrapper = shallow(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    expect(wrapper.find(PublishContainer)).toHaveLength(1);
    expect(wrapper.find(TitleInput)).toHaveLength(1);
    expect(wrapper.find(BodyInput)).toHaveLength(1);
    done();
  });

  it('should render PageNotFound if statusCode is 404', (done) => {
    const wrapper = shallow(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
        statusCode={404}
      />
    );
    expect(wrapper.find(PageNotFound)).toHaveLength(1);
    expect(wrapper.find(PublishContainer)).toHaveLength(0);
    expect(wrapper.find(TitleInput)).toHaveLength(0);
    expect(wrapper.find(BodyInput)).toHaveLength(0);
    done();
  });

  it('should display validation errors when input is invalid', (done) => {
    const invalidInputError = {
      body: ['Body must be at least 10 characters'],
      title: ['Title must be at least 5 characters']
    };
    const publishSpy = jest.spyOn(UpdateArticle.prototype, 'publishHandler');
    const wrapper = shallow(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.find('.publish__button').simulate('click');
    expect(publishSpy).toHaveBeenCalled();
    expect(showError).toBeCalledWith(invalidInputError);
    wrapper.setProps({
      errors: invalidInputError
    });
    expect(wrapper.find('section.update-section').hasClass('show-butter')).toBeTruthy();
    publishSpy.mockRestore();
    done();
  });

  it('should display publish settings dialog when title and body inputs are valid', (done) => {
    const publishSpy = jest.spyOn(UpdateArticle.prototype, 'publishHandler');
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      edited: true
    });
    wrapper.find('.publish__button').simulate('click');
    expect(publishSpy).toHaveBeenCalled();
    expect(openPublishModal).toHaveBeenCalled();
    wrapper.setProps({
      showDialog: true
    });
    expect(wrapper.find('.modal.m-publish').hasClass('is-active')).toBeTruthy();
    publishSpy.mockRestore();
    done();
  });


  it('should handle Editor\'s TitleChange and BodyChange', (done) => {
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      edited: true
    });
    const titleEvent = {
      target: {
        getContent: () => 'Test title changed'
      }
    };
    const bodyEvent = {
      target: {
        getContent: () => 'Test body content changed'
      }
    };
    wrapper.instance().titleChangeHandler(titleEvent);
    wrapper.instance().bodyChangeHandler(bodyEvent);
    expect(wrapper.state('rawTextValue').title).toEqual('Test title changed');
    expect(wrapper.state('rawTextValue').body).toEqual('Test body content changed');
    done();
  });

  it('should handle Editor\'s TitleEditorChange and BodyEditorChange', (done) => {
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      edited: true
    });
    wrapper.instance().titleEditorChangeHandler('Test title');
    wrapper.instance().bodyEditorChangeHandler('Test body content');
    expect(wrapper.state('rawTextValue').title).toEqual('Test title');
    expect(wrapper.state('rawTextValue').body).toEqual('Test body content');
    done();
  });

  it('should set title and body state to empty string on focusIn when title and body equals initialValue', (done) => {
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Title',
        body: 'Start typing ...',
      },
      title: 'Title',
      body: '<p>Start typing ...</p>',
      description: 'Test body content',
      edited: true
    });
    wrapper.instance().titleFocusInHandler();
    wrapper.instance().bodyFocusInHandler();
    expect(wrapper.state('title')).toEqual('');
    expect(wrapper.state('body')).toEqual('');
    done();
  });

  it('should set title and body state to their initial value on focusOut if content is empty', (done) => {
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: '',
        body: '',
      },
      title: '',
      body: '',
      description: '',
      edited: true
    });
    wrapper.instance().titleFocusOutHandler();
    wrapper.instance().bodyFocusOutHandler();
    expect(wrapper.state('title')).toEqual('Title');
    expect(wrapper.state('body')).toEqual('<p>Start typing ...</p>');
    done();
  });


  it('should allow user to finish publishing article via publish settings when all inputs are valid', (done) => {
    const finishSpy = jest.spyOn(UpdateArticle.prototype, 'finish');
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      tags: [{
        label: 'Test',
        value: 'Test',
        __isNew__: true
      }],
      edited: true
    });
    wrapper.find('.publish__button').simulate('click');
    wrapper.find('.action__finish').simulate('click');
    expect(openPublishModal).toHaveBeenCalled();
    expect(finishSpy).toHaveBeenCalled();
    wrapper.setProps({
      showDialog: false
    });
    expect(wrapper.find('.modal.m-publish').hasClass('is-active')).toBeFalsy();
    finishSpy.mockRestore();
    done();
  });

  it('should close publish settings modal when cancel button is clicked', (done) => {
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      tags: [{
        label: 'Test',
        value: 'Test',
        __isNew__: true
      }],
      edited: true
    });
    wrapper.find('.publish__button').simulate('click');
    wrapper.find('.action__cancel').simulate('click');
    expect(openPublishModal).toHaveBeenCalled();
    expect(closePublishModal).toHaveBeenCalled();
    wrapper.setProps({
      showDialog: false
    });
    expect(wrapper.find('.modal.m-publish').hasClass('is-active')).toBeFalsy();
    done();
  });

  it('should change tag state when tags are added', (done) => {
    const newTags = [
      {
        label: 'Test',
        value: 'Test',
        __isNew__: true
      },
      {
        label: 'Spy',
        value: 'Spy',
        __isNew__: true
      }
    ];
    const tagChangeHandlerSpy = jest.spyOn(UpdateArticle.prototype, 'tagChangeHandler');
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      tags: [{
        label: 'Test',
        value: 'Test',
        __isNew__: true
      }],
      edited: true
    });
    wrapper.find('.publish__button').simulate('click');
    wrapper.instance().tagChangeHandler(newTags);
    wrapper.setProps({
      showDialog: true
    });
    expect(openPublishModal).toHaveBeenCalled();
    expect(tagChangeHandlerSpy).toHaveBeenCalled();
    expect(wrapper.find('.modal.m-publish').hasClass('is-active')).toBeTruthy();
    tagChangeHandlerSpy.mockRestore();
    done();
  });

  it('should change isPrivate and downloadable checkbock state', (done) => {
    const isPrivate = {
      target: {
        name: 'isPrivate'
      }
    };
    const downloadable = {
      target: {
        name: 'isPrivate'
      }
    };
    const checkBoxHandlerSpy = jest.spyOn(UpdateArticle.prototype, 'checkBoxHandler');
    const wrapper = mount(
      <UpdateArticle
        publishArticle={publishArticle}
        openPublishModal={openPublishModal}
        closePublishModal={closePublishModal}
        showDialog={showDialog}
        loading={loading}
        showError={showError}
        hideError={hideError}
        errors={errors}
        responseMessage={responseMessage}
        getArticle={getArticle}
        match={match}
      />
    );
    wrapper.setState({
      rawTextValue: {
        title: 'Test title',
        body: 'Test body content',
      },
      title: 'Test title',
      body: '<p>Test body content<p>',
      description: 'Test body content',
      edited: true
    });
    wrapper.find('.publish__button').simulate('click');
    wrapper.instance().checkBoxHandler(isPrivate);
    wrapper.instance().checkBoxHandler(downloadable);
    wrapper.setProps({
      showDialog: true
    });
    expect(openPublishModal).toHaveBeenCalled();
    expect(checkBoxHandlerSpy).toHaveBeenCalled();
    expect(wrapper.find('.modal.m-publish').hasClass('is-active')).toBeTruthy();
    checkBoxHandlerSpy.mockRestore();
    done();
  });

  describe('imageUploadHandler', () => {
    const blobInfo = new Blob();
    it('should call success callback with returned imageurl when image has been uploaded successfully', (done) => {
      const mockSuccess = jest.fn(message => (message));
      const mockFailure = jest.fn();
      const imageUploadHandlerSpy = jest.spyOn(UpdateArticle.prototype, 'imageUploadHandler');
      const imageUrl = 'res.cloudinary/image-url';
      const wrapper = shallow(
        <UpdateArticle
          publishArticle={publishArticle}
          openPublishModal={openPublishModal}
          closePublishModal={closePublishModal}
          showDialog={showDialog}
          loading={loading}
          showError={showError}
          hideError={hideError}
          errors={errors}
          responseMessage={responseMessage}
          getArticle={getArticle}
          match={match}
        />
      );
      uploadArticleImage.mockImplementation(() => Promise.resolve(imageUrl));
      wrapper.instance().imageUploadHandler(blobInfo, mockSuccess, mockFailure);
      expect(imageUploadHandlerSpy).toHaveBeenCalled();
      done();
    });
    it('should call failure callback with when image upload fails', (done) => {
      const mockSuccess = jest.fn(message => (message));
      const mockFailure = jest.fn();
      const imageUploadHandlerSpy = jest.spyOn(UpdateArticle.prototype, 'imageUploadHandler');
      const wrapper = shallow(
        <UpdateArticle
          publishArticle={publishArticle}
          openPublishModal={openPublishModal}
          closePublishModal={closePublishModal}
          showDialog={showDialog}
          loading={loading}
          showError={showError}
          hideError={hideError}
          errors={errors}
          responseMessage={responseMessage}
          getArticle={getArticle}
          match={match}
        />
      );
      uploadArticleImage.mockImplementation(() => Promise.reject());
      wrapper.instance().imageUploadHandler(blobInfo, mockSuccess, mockFailure);
      expect(imageUploadHandlerSpy).toHaveBeenCalled();
      done();
    });
  });
});
