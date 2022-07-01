const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { failed } = require('../helpers/response');

// management file
const maxSize = 2 * 1024 * 1024;
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      const name = crypto.randomBytes(30).toString('hex');
      const ext = path.extname(file.originalname);
      const filename = `${name}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb({ message: 'Image extension only can .jpg, .jpeg, and .png' }, false);
    }
  },
  limits: {
    fileSize: maxSize,
  },
});

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('image');
  multerSingle(req, res, (err) => {
    if (err) {
      let errorMessage = err.message;
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = `File ${err.field} too large, max 2mb`;
      }

      failed(res, {
        code: 400,
        message: errorMessage,
        error: 'Upload File Error',
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
