const multer = require('multer');
const path = require('path');
const { failed } = require('../helpers/response');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/users');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileSize = parseInt(req.headers['content-length']);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: 'File size exceeds 2 MB',
      };
      return cb(error, false);
    }
    if (ext === '.jpg' || ext === '.png') {
      cb(null, true);
    } else {
      const error = {
        message: 'file must be jpg or png',
      };
      cb(error, false);
    }
  },
});

const uploadUser = (req, res, next) => {
  const multerSingle = multerUpload.single('avatar');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 400,
        message: err.message,
        error: 'Bad Request',
      });
    } else {
      next();
    }
  });
};

module.exports = uploadUser;
