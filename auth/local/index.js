const { Router } = require('express');
const { loginHandler, activateHandler } = require('./local.controller');

const router = Router();

//login
router.post('/login', loginHandler);
//change password
//reset password
//activate account
router.post('/activate/:token', activateHandler);
//logout

module.exports = router;
