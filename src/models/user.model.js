const db = require('../config/pg');

module.exports = {
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
