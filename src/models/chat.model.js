const db = require('../config/pg');

module.exports = {
  detailChat: (receiver) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM chats WHERE receiver = $1 ORDER BY created_at DESC limit 1`,
        [sender, receiver],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  insertChat: (data) =>
    new Promise((resolve, reject) => {
      const { id, sender, receiver, type, message, isRead } = data;
      db.query(
        `INSERT INTO chats VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, sender, receiver, type, message, isRead],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  listChat: (sender, receiver) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        chats.id, userSender.fullname AS sender, userReceiver.fullname AS receiver, chats.message
        FROM chats 
        LEFT JOIN users AS userSender ON chats.sender = userSender.id
        LEFT JOIN users AS userReceiver ON chats.receiver = userReceiver.id
        WHERE (sender='${sender}' AND receiver='${receiver}') 
        OR (sender='${receiver}' AND receiver='${sender}')`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
};
