const db = require('../config/pg');

module.exports = {
  detailChat: (sender, receiver) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM chats WHERE (sender='${sender}' AND receiver='${receiver}') 
        OR (sender='${receiver}' AND receiver='${sender}') ORDER BY created_at DESC LIMIT 1`,
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
        chats.id, userSender.id AS sender_id, userReceiver.id AS receiver_id,
        userSender.name AS sender, userReceiver.name AS receiver, chats.message,
        userSender.avatar AS sender_avatar, userReceiver.avatar AS receiver_avatar,
        chats.created_at FROM chats 
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
  deleteChat: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM chats WHERE id $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
