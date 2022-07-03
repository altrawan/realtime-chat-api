const express = require('express');

const { isVerified } = require('../middlewares/authorization');
const {
  register,
  login,
  forgot,
  reset,
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const {
  registeration,
  activation,
  loginAccount,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register', register, validation, registeration)
  .get('/auth/activation/:token', activation)
  .post('/auth/login', isVerified, login, validation, loginAccount)
  .put('/auth/forgot', isVerified, forgot, validation, forgotPassword)
  .put('/auth/reset/:token', isVerified, reset, validation, resetPassword);

module.exports = router;
