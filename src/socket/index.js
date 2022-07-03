const { v4: uuidv4 } = require('uuid');
const chatModel = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('join-room', (id) => {
    try {
      socket.join(id);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on('chat-history', async (data) => {
    try {
      const { sender, receiver } = data;
      const listChat = await chatModel.list(sender, receiver);
      io.to(sender).emit('send-message-response', listChat.rows);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on('send-message', async (data) => {
    try {
      const { sender, receiver, message } = data;

      await chatModel.store({
        id: uuidv4(),
        sender,
        receiver,
        message,
        type: 'text',
      });

      const listChat = await chatModel.list(sender, receiver);

      io.to(receiver).emit('send-message-response', listChat.rows);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on('edit-message', async (data) => {
    try {
      const { sender, receiver, message, id } = data;

      await chatModel.update(message, id);

      const listChat = await chatModel.list(sender, receiver);

      io.to(sender).emit('send-message-response', listChat.rows);
      io.to(receiver).emit('send-message-response', listChat.rows);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on('destroy-message', async (data) => {
    try {
      const { sender, receiver, id } = data;

      await chatModel.destroy(id);

      const listChat = await chatModel.list(sender, receiver);

      io.to(sender).emit('send-message-response', listChat.rows);
      io.to(receiver).emit('send-message-response', listChat.rows);
    } catch (error) {
      console.log(error.message);
    }
  });
  socket.on('delete-message', async (data) => {
    try {
      const { sender, receiver, id } = data;

      await chatModel.delete(id);

      const listChat = await chatModel.list(sender, receiver);

      io.to(sender).emit('send-message-response', listChat.rows);
      io.to(receiver).emit('send-message-response', listChat.rows);
    } catch (error) {
      console.log(error.message);
    }
  });
};
