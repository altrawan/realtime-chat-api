const { findBy } = require('../models/user.model');
const { failed } = require('../helpers/response');

module.exports = {
  isVerified: async (req, res, next) => {
    try {
      const user = await findBy('email', req.body.email);

      if (!user.rowCount) {
        next();
      } else if (user.rows[0].is_verified) {
        next();
      } else {
        failed(res, {
          code: 401,
          message: 'Your email is not verified yet',
          error: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
};
