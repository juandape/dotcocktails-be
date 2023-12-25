const { Router } = require('express');
const multer = require('multer');

const { uploadHandler } = require('./upload.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/files', upload.array('files'), uploadHandler);

module.exports = router;
