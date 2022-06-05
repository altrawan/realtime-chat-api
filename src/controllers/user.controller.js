const { success, failed } = require('../helpers/response');
const userModel = require('../models/user.model');

module.exports = {
  list: async (req, res) => {
    try {
      let { search, limit } = req.query;

      search = search || '';
      limit = limit || 100

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
};
