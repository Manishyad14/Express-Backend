let authors = [
  { authorId: 1, name: "George Orwell", book: "1984" },
  { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
  { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

// Function to get all authors
function getAuthors() {
  return authors;
}

// Function to get an author by ID
function getAuthorById(id) {
  return authors.find((author) => author.authorId === id);
}

// Function to add a new author
function addAuthor(newAuthor) {
  const authorId = authors.length + 1;
  const author = { authorId, ...newAuthor };
  authors.push(author);
  return author;
}

module.exports = { getAuthors, getAuthorById, addAuthor };
