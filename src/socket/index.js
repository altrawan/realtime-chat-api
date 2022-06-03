const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helpers/response');
const { listChat, insertChat } = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('join-room', (data) => {
    socket.join(data.id);
  });
  socket.on('send-message', async (data) => {
    try {
      const { sender, receiver, message } = data;
      const setData = {
        id: uuidv4(),
        sender: '',
        receiver: '',
        type: 0,
        message: '',
        isRead: 0,
      };

      await insertChat(setData);
      const result = await listChat(sender, receiver);
      io.emit('send-message-response', result.rows);

      return success(res, {
        code: 201,
        message: `Success send message`,
        data: result.rows,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  });
  socket.on('chat-history', async (data) => {
    try {
      const { sender, receiver } = data;
      const result = await listChat(sender, receiver);
      io.emit('send-message-response', result.rows);
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  });
};
