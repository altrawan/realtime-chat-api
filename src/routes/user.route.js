const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { list } = require('../controllers/user.controller');

const router = express.Router();
router.get('/user', jwtAuth, list);

module.exports = router;
