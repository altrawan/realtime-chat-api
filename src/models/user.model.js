const db = require('../config/pg');

module.exports = {
  list: (search, limit) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name ILIKE ('%${search}%') LIMIT $1`,
        [limit],
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
      db.query(
        `SELECT * FROM users WHERE ${field} = $1`,
        [search],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  updateUser: (data, id) =>
    new Promise((resolve, reject) => {
      const { name, email, username, phoneNumber, bio, updatedAt } = data;
      db.query(
        `UPDATE users SET name = $1, email = $2, username = $3, phone_number = $4, bio = $5, updated_at = $6 WHERE id = $7`,
        [name, email, username, phoneNumber, bio, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
  updateImage: (data, id) =>
    new Promise((resolve, reject) => {
      const { avatar, updatedAt } = data;
      db.query(
        `UPDATE users SET avatar = $1, updated_at = $2 WHERE id = $3`,
        [avatar, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
  updatePassword: (data, id) =>
    new Promise((resolve, reject) => {
      const { password, updatedAt } = data;
      db.query(
        `UPDATE users SET password = $1, updated_at = $2 WHERE id = $3`,
        [password, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
};
