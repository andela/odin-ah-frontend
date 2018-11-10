const uploadArticleImage = async (blobInfo) => {
  const formData = new FormData();
  formData.append('file', blobInfo.blob());
  formData.append('upload_preset', 'luzklbn9');
  const response = await fetch('https://api.cloudinary.com/v1_1/mentos/image/upload', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  const { secure_url: uploadUrl } = result;
  return uploadUrl;
};

export default uploadArticleImage;
