import sinon from 'sinon';
import apiRequest from '../services/apiRequest';

it('should return an API response with articles data', async () => {
  const data = {
    articles: [
      {
        slug: 'the-death-of-radio-cassettes-bmiqourP',
        title: 'The death of radio cassettes',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris velit orci, scelerisque eleifend metus et, pretium vehicula orci. Curabitur iaculis sed mi id pretium. Mauris a rutrum erat. Sed tempus lectus vitae pharetra interdum. Aenean ullamcorper, mi et dictum ultrices, risus mi facilisis ex, id interdum sem quam a dui. Suspendisse iaculis ut ipsum non gravida. Aliquam eros orci, ullamcorper a mauris sit amet, lacinia semper eros. Pellentesque sollicitudin a mi at mollis. Sed ac sapien dolor. Duis porttitor odio eu nulla mollis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec mi neque, tincidunt ac tempor ut, facilisis eu odio. Nunc et commodo metus. Suspendisse non urna id sem tempor ultrices. Sed volutpat massa id pellentesque lobortis.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: null,
        readingTime: '37200',
        isPublished: true,
        isPrivate: false,
        createdAt: '2018-01-24T18:12:18.878Z',
        tags: ['Food'],
        author: {
          username: 'macphilips',
          name: 'John victor Doe lee',
          bio: 'profile page edit this I want to edithv',
          imageUrl:
            'http://res.cloudinary.com/dk2ot4wij/image/upload/v1542190066/begpik8z7yybst9tlbz1.jpg'
        },
        reaction: {
          likeCount: 0,
          dislikeCount: 0
        }
      }
    ],
    page: 1,
    totalPages: 1,
    size: 7,
    total: 7
  };
  const apiStub = sinon.stub(apiRequest.axios, 'get').resolves(data);
  const response1 = await apiRequest.fetchArticles();
  const response2 = await apiRequest.fetchArticles(2, 5);
  apiStub.restore();
  expect(response1).toEqual(data);
  expect(response2).toEqual(data);
});

it('should return an API response with articles data', async () => {
  const data = {
    tags: ['tag1', 'tag2']
  };
  const apiStub = sinon.stub(apiRequest.axios, 'get').resolves(data);
  const response = await apiRequest.fetchPopularTags();
  apiStub.restore();
  expect(response).toEqual(data);
});
