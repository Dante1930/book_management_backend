# Book Management System API

This project is a Book Management System built using **Node.js** and **Express.js** with **MongoDB** for data storage. The API supports various operations such as creating, updating, deleting, and fetching books. It also includes features for pagination, filtering, sorting, and book cover image upload using **Multer**.

## Features

- **CRUD Operations**: Create, read, update, and delete books.
- **Image Upload**: Upload book cover images.
- **Filtering and Sorting**: Filter books by title, author, genre, and publication date.
- **Pagination**: Support for paginated API responses.
- **Authentication **: Protect routes using JWT tokens.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Upload**: Multer
- **Middleware**: Custom middleware for validation, error handling, and authentication
- **Authentication**: JWT-based authentication

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v20 or higher)
- **npm** 
- **MongoDB**
- **Git** (to clone the repository)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Dante1930/book_management_backend.git
cd book_management_backend
npm install

POST /api/books
Content-Type: multipart/form-data
Authorization: Bearer <your_token>

Form Data:
- title: "The Great Gatsby"
- author: "F. Scott Fitzgerald"
- genre: "Fiction"
- publicationDate: "1925-04-10"
- coverImage: <upload_file>
