const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    coverImage: { type: String }, // For storing image path or URL
  });
  
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;