const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { deleteChat } = require('../controllers/chat.controller');

const router = express.Router();
router.delete('/chat/:id', jwtAuth, deleteChat);

module.exports = router;
