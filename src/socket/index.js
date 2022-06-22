const { v4: uuidv4 } = require('uuid');
const { listChat, insertChat, deleteChat } = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('join-room', (data) => {
    socket.join(data.id);
  });
  socket.on('send-message', async (data) => {
    const { sender, receiver, type, message } = data;
    const setData = {
      id: uuidv4(),
      sender,
      receiver,
      type,
      message,
      isRead: 1,
    };

    insertChat(setData)
      .then(async () => {
        const listChats = await listChat(sender, receiver);
        io.to(receiver).emit('send-message-response', listChats.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  socket.on('chat-history', async (data) => {
    const { sender, receiver } = data;
    const listChats = await listChat(sender, receiver);
    io.to(sender).emit('send-message-response', listChats.rows);
  });
  socket.on('delete-message', (data) => {
    const { id, sender, receiver } = data;
    deleteChat(id)
      .then(async () => {
        const listChats = await listChat(sender, receiver);
        io.to(sender).emit('send-message-response', listChats.rows);
        io.to(receiver).emit('send-message-response', listChats.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
