const { Router } = require('express');
const multer = require('multer');

const { uploadHandler } = require('./upload.controller');
const { isAuthenticated } = require('../../auth/auth.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/files', isAuthenticated, upload.array('files'), uploadHandler);

module.exports = router;
