// index.js

const express = require("express");
const { getAllBooks, getBooksById } = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes

// Exercise 1: Retrieve All Books
app.get("/books", (req, res) => {
  const books = getAllBooks();
  res.status(200).json({ books });
});

// Exercise 2: Retrieve Book by ID
app.get("/books/details/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validate ID format
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid book ID format" });
  }

  const book = getBooksById(id);
  if (book) {
    res.status(200).json({ book });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});



module.exports = { app };
