jest.mock('uuid', () => ({
  v4: () => '81d18e4a-45dd-4bcf-b79b-2abd8b932663'
}));

const Post = require('./post.model');

describe('Post model', () => {
  it('creates post from request', () => {
    const requestBody = {
      title: 'some title',
      content: 'some content'
    };

    expect(Post.fromRequestBody(requestBody).toJSON()).toEqual({
      id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
      title: 'some title',
      content: 'some content'
    })
  })
});