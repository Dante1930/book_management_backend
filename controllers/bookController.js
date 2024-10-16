const Book = require('../models/book');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// Fetch all books with pagination, sorting, and filtering
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, title, author, genre } = req.query;
  const query = {};

  if (title) query.title = { $regex: title, $options: 'i' }; // Case insensitive
  if (author) query.author = { $regex: author, $options: 'i' };
  if (genre) query.genre = { $regex: genre, $options: 'i' };

  try {
    const books = await Book.find(query)
      .sort({ title: 1 }) // You can also sort by other fields based on query parameters
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Book.countDocuments(query);
    res.json({ totalPages: Math.ceil(count / limit), books });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, genre, publicationDate } = req.body;
  const coverImage = req.file ? req.file.filename : null;

  try {
    const newBook = new Book({ title, author, genre, publicationDate, coverImage });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update book details
exports.updateBook = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, author, genre, publicationDate } = req.body;
  const coverImage = req.file ? req.file.filename : null;

  try {
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }
  
    // Check if a new cover image is uploaded
    if (req.file) {
      // Delete the old image file from the server
      const oldImagePath = path.join(__dirname, '..', 'uploads', existingBook.coverImage); // Adjust the path based on your structure
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      
      // Update the cover image path
      existingBook.coverImage = coverImage;
    }
  
    // Update other book details
    existingBook.title = title;
    existingBook.author = author;
    existingBook.genre = genre;
    existingBook.publicationDate = publicationDate;
  
    // Save the updated book
    await existingBook.save();
    res.json(existingBook);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get the image path and delete it from the file system
    const imagePath = book.coverImage; // Assuming 'imagePath' stores the file path of the image
    if (imagePath) {
      const fullPath = path.join(__dirname, '..', 'uploads', imagePath); // Adjust the path based on your structure
      console.log(fullPath)

      // Check if the image exists before trying to delete it
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete the image from the file system
      }
    }

    // Delete the book from the database
    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: 'Book and associated image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
