const { success, failed } = require('../helpers/response');
const chatModel = require('../models/chat.model');

module.exports = {
  deleteChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await chatModel.findBy('id', id);

      if (!chat.rowCount) {
        return failed(res, {
          code: 404,
          message: `Chat with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const result = await chatModel.deleteChat(id);

      return success(res, {
        code: 200,
        message: `Success delete chat`,
        data: null,
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
