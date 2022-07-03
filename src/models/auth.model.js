const db = require('../config/pg');

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      const { id, name, email, password, token } = data;
      db.query(
        `INSERT INTO users (id, name, email, password, verify_token, is_verified, is_active) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, name, email.toLowerCase(), password, token, 0, 0],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  userActivation: (token) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET verify_token = null, is_verified = 1, is_active = 1 
        WHERE verify_token = $1`,
        [token],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(token);
        }
      );
    }),
  updateToken: (token, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET verify_token = $1 WHERE id = $2`,
        [token, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            token,
          };
          resolve(newData);
        }
      );
    }),
  resetPassword: (password, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET password = $1, verify_token = null WHERE id = $2`,
        [password, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            password,
          };
          resolve(newData);
        }
      );
    }),
};
