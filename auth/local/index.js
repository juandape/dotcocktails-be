const { Router } = require('express');
const { loginHandler } = require('./local.controller');

const router = Router();

//login
router.post('/login', loginHandler);
//change password
//reset password
//activate account
//logout

module.exports = router;
