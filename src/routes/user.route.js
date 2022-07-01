const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { update, password } = require('../validations/user.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/upload');
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
  .put('/user', jwtAuth, update, validation, updateUser)
  .put('/user-image', jwtAuth, upload, updateImage)
  .put('/user-password', jwtAuth, password, validation, updatePassword);

module.exports = router;
