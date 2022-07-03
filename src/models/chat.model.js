const db = require('../config/pg');

module.exports = {
  list: (sender, receiver) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        chats.id, chats.message, chats.created_at, chats.is_deleted,
        userSender.id AS sender_id, userReceiver.id AS receiver_id, 
        userSender.name AS sender, userSender.avatar AS avatar
        FROM chats 
        LEFT JOIN users AS userSender ON chats.sender = userSender.id
        LEFT JOIN users AS userReceiver ON chats.receiver = userReceiver.id
        WHERE (sender='${sender}' AND receiver='${receiver}') 
        OR (sender='${receiver}' AND receiver='${sender}') ORDER BY chats.created_at ASC`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  detail: (sender, receiver) =>
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
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      console.log(search);
      db.query(
        `SELECT * FROM chats WHERE ${field} = $1`,
        [search],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  store: (data) =>
    new Promise((resolve, reject) => {
      const { id, sender, receiver, message, type } = data;
      db.query(
        `INSERT INTO chats (id, sender, receiver, message, type, is_read, is_deleted) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, sender, receiver, message, type, false, false],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  update: (message, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE chats SET message=$1 WHERE id=$2`,
        [message, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve({
            id,
            message,
          });
        }
      );
    }),
  destroy: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE chats SET is_deleted = true WHERE id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  delete: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM chats WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
