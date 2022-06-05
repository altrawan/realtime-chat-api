const { v4: uuidv4 } = require('uuid');
const { listChat, insertChat } = require('../models/chat.model');

module.exports = (io, socket) => {
  socket.on('join-room', (data) => {
    socket.join(data.id);
  });
  socket.on('send-message', async (data) => {
    const { sender, receiver, message } = data;
    const setData = {
      id: uuidv4(),
      sender,
      receiver,
      type: 0,
      message,
      isRead: 1,
    };

    insertChat(setData)
      .then(async () => {
        const listChats = await list(sender, receiver);
        io.to(receiver).emit('send-message-response', listChats.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  socket.on('chat-history', async (data) => {
    const { sender, receiver } = data;
    const result = await listChat(sender, receiver);
    io.emit('send-message-response', result.rows);
  });
};
