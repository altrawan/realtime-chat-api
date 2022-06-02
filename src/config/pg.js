const { Pool } = require('pg');
const {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = require('../helpers/env');

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

if (NODE_ENV === 'production') {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log('Failed to connect database...', err.message);
    process.exit(1);
  }
});

module.exports = db;
