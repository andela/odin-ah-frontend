import uploadArticleImage from '../../services/cloudinary';

describe('uploadArticleImage', () => {
  const secureUrl = 'res.cloudinary.address/to/image.png';
  let response = { secure_url: secureUrl };
  response = JSON.stringify(response);
  const mockResponse = () => new window.Response(response, {
    status: 200,
    statusText: 'Successful',
    headers: {
      'Content-type': 'application/json'
    }
  });
  it('should upload article image and return image url', async () => {
    const blobInfo = new Blob([''], { type: 'image/jpeg' });
    blobInfo.blob = jest.fn();
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse()));
    const uploadUrl = await uploadArticleImage(blobInfo);
    expect(uploadUrl).toEqual(secureUrl);
    window.fetch.mockRestore();
  });
});
