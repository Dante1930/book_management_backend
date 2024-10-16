const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // You can specify any directory you prefer for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  },
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|bmp|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only images are allowed (jpeg, jpg, png, gif, bmp, webp)')); // Reject the file

  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file size
});

module.exports = upload;
