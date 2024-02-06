const { Router } = require('express');
const {
  loginHandler,
  activateHandler,
  forgotHandler,
  resetHandler,
} = require('./local.controller');

const router = Router();

//login
router.post('/login', loginHandler);
//forgot password
router.post('/forgot-password', forgotHandler);
//reset password
router.post('/reset-password/:token', resetHandler);
//activate account
router.post('/activate/:token', activateHandler);
//logout

module.exports = router;

