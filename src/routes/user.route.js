const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { update, password } = require('../validations/user.validation');
const validator = require('../middlewares/validator');
const upload = require('../middlewares/uploadUser');
const {
  list,
  detail,
  updateUser,
  updateImage,
  updatePassword,
} = require('../controllers/user.controller');

const router = express.Router();
router
  .get('/user', jwtAuth, list)
  .get('/user/:id', jwtAuth, detail)
  .put('/user', jwtAuth, update, validator, updateUser)
  .put('/user-image', jwtAuth, upload, updateImage)
  .put('/user-password', jwtAuth, password, validator, updatePassword);

module.exports = router;
