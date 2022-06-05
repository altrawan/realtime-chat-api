const db = require('../config/pg');

module.exports = {
  list: (search, limit) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name ILIKE ('%${search}%') LIMIT $1`, [limit],
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
};
