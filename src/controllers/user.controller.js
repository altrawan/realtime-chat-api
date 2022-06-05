const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const userModel = require('../models/user.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  list: async (req, res) => {
    try {
      let { search, limit } = req.query;

      search = search || '';
      limit = Number(limit) || 100;

      const result = await userModel.list(search, limit);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: `Success get all users data`,
        data: result.rows,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findBy('id', id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: `Success get detail user`,
        data: user.rows[0],
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;
      const user = await userModel.findBy('id', id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const data = {
        ...req.body,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updateUser(data, id);

      return success(res, {
        code: 200,
        message: 'Success edit profile',
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
  updateImage: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;
      const user = await userModel.findBy('id', id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/users/${req.file.filename}`);
        }
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      let { avatar } = user.rows[0];
      if (req.file) {
        if (avatar !== 'default.png') {
          deleteFile(`public/uploads/users/${avatar}`);
        }
        avatar = req.file.filename;
      }

      const data = {
        avatar,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updateImage(data, id);

      return success(res, {
        code: 200,
        message: 'Success edit profile',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/users/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;
      const user = await userModel.findBy('id', id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const { password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const data = {
        password: hashPassword,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updatePassword(data, id);

      return success(res, {
        code: 200,
        message: 'Success edit profile',
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
