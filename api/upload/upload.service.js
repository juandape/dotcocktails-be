const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImg(image) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'upload-folder',
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  uploadImg,
};
