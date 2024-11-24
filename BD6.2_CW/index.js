const express = require("express");
const { getAuthors, getAuthorById, addAuthor } = require("./authors.js");
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to get all authors
app.get("/authors", (req, res) => {
  res.json(getAuthors());
});

// Endpoint to get author by ID
app.get("/authors/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = getAuthorById(id);
  if (!author) return res.status(404).send("Author not found");
  res.json(author);
});

// Endpoint to add a new author
app.post("/authors/new", (req, res) => {
  const { authorId, name, book } = req.query;
  const newAuthor = { authorId: parseInt(authorId), name, book };
  const addedAuthor = addAuthor(newAuthor);
  res.status(201).json(addedAuthor);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
