const fs = require('fs');
const { uploadImg } = require('./upload.service');

async function uploadHandler(req, res) {
  const files = req.files;

  if (!files) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const promises = files.map((file) => uploadImg(file.path));

    const results = await Promise.all(promises);

    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    files.forEach((file) => fs.unlinkSync(file.path));
  }
}

module.exports = {
  uploadHandler,
};
