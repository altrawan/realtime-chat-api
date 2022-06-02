const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRED } = require('../helpers/env');

module.exports = (payload) => {
  delete payload.password;
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRED,
  });

  return token;
};
