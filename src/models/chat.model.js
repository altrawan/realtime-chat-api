const db = require('../config/pg');

module.exports = {
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
};
