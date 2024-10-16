const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/multer'); // Multer middleware
const { validateBook } = require('../validators/bookvalidation');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/', authMiddleware,bookController.getBooks);
// POST /books - Add a new book (with image upload)
router.post('/',authMiddleware, upload.single('coverImage'), validateBook, bookController.addBook);

// PUT /books/:id - Update book details (with image upload)
router.put('/:id',authMiddleware, upload.single('coverImage'), validateBook, bookController.updateBook);

router.delete('/:id', authMiddleware,bookController.deleteBook);

module.exports = router;
