const express = require('express');
const { isVerified } = require('../middlewares/authorization');
const validation = require('../validations/auth.validation');
const validator = require('../middlewares/validator');
const {
  register,
  activation,
  login,
  forgot,
  reset,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register', validation.register, validator, register)
  .get('/auth/activation/:token', activation)
  .post('/auth/login', isVerified, validation.login, validator, login)
  .put('/auth/forgot', isVerified, validation.forgot, validator, forgot)
  .put('/auth/reset', isVerified, validation.reset, validator, reset);

module.exports = router;
