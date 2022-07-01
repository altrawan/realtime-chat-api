const { validationResult } = require('express-validator');
const { failed } = require('../helpers/response');

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return failed(res, {
      code: 422,
      message: 'Validation Failed',
      error: extractedErrors,
    });
  } catch (error) {
    failed(res, {
      code: 500,
      message: err.message,
      error: 'Internal Server Error',
    });
  }
};
