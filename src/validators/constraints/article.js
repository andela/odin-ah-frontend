// eslint-disable-next-line import/prefer-default-export
export const createArticleConstraint = {
  title: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 5 characters'
    },
    exclusion: {
      within: ['Title'],
      message: '^Enter a valid article title'
    }
  },
  body: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must be at least 10 characters'
    },
    exclusion: {
      within: ['Start typing ...', '<p>Start typing ...</p>'],
      message: '^Please start typing before you try to publish'
    }
  }
};
