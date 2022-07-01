const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { API_URL, APP_CLIENT } = require('../helpers/env');
const { success, failed } = require('../helpers/response');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');
const jwtToken = require('../utils/generateJwtToken');

module.exports = {
  registeration: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.findBy('email', email);

      if (user.rowCount) {
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(30).toString('hex');

      const data = {
        id: uuidv4(),
        name,
        email,
        password: hashPassword,
        avatar: 'default.png',
        token,
      };
      const result = await authModel.register(data);

      return success(res, {
        code: 201,
        message: 'Success Registered, please verification your email',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  activation: async (req, res) => {
    try {
      const { token } = req.query;
      const user = await userModel.findBy('token', token);

      if (!user.rowCount) {
        return failed(res, {
          code: 400,
          message: 'Activation failed',
          error: 'Bad Request',
        });
      }

      await authModel.userActivation(token);
      res.render('./welcome.ejs', {
        name: user.rows[0].name,
        url_home: `${APP_CLIENT}`,
        url_login: `${APP_CLIENT}/auth/login`,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findBy('email', email);
      if (user.rowCount) {
        if (user.rows[0].is_active) {
          const match = await bcrypt.compare(password, user.rows[0].password);

          if (match) {
            const jwt = jwtToken(user.rows[0]);
            return success(res, {
              code: 200,
              message: 'Login sucess',
              data: user.rows[0],
              token: jwt,
            });
          } else {
            return failed(res, {
              code: 401,
              message: 'Wrong email or password',
              error: 'Unauthorized',
            });
          }
        } else {
          return failed(res, {
            code: 403,
            message: 'Your account has been banned',
            error: 'Forbidden',
          });
        }
      } else {
        return failed(res, {
          code: 401,
          message: 'Wrong email or password',
          error: 'Unauthorized',
        });
      }
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findBy('email', email);

      if (user.rowCount) {
        const token = crypto.randomBytes(30).toString('hex');

        const result = await authModel.updateToken(token, user.rows[0].id);

        return success(res, {
          code: 200,
          message: 'Password reset has been sent via email',
          data: result,
        });
      } else {
        return failed(res, {
          code: 404,
          message: 'Email not found',
          error: 'Not Found',
        });
      }
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.query;
      const user = await authModel.findBy('token', token);

      if (!user.rowCount) {
        return failed(res, {
          code: '401',
          message: 'Invalid token',
          error: 'Unauthorized',
        });
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const result = await authModel.resetPassword(password, user.rows[0].id);

      return success(res, {
        code: 200,
        message: 'Reset Password Success',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
};
