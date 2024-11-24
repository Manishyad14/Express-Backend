const { getAuthors, getAuthorById, addAuthor } = require("../authors.js");

describe("Author Functions", () => {
  // Test Get All Authors
  it("should get all authors", () => {
    let authors = getAuthors();
    expect(authors.length).toBe(3);
    expect(authors).toEqual([
      { authorId: 1, name: "George Orwell", book: "1984" },
      { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
      { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
    ]);
  });

  // Test Get Author by ID
  it("should get an author by ID", () => {
    let author = getAuthorById(1);
    expect(author).toEqual({
      authorId: 1,
      name: "George Orwell",
      book: "1984",
    });
  });

  // Test Get Author by Non-Existent ID
  it("should return undefined for a non-existent author ID", () => {
    let author = getAuthorById(99);
    expect(author).toBeUndefined();
  });

  // Test Add New Author
  it("should add a new author", () => {
    const newAuthor = {
      authorId: 4,
      name: "J.K. Rowling",
      book: "Harry Potter",
    };
    let addedAuthor = addAuthor(newAuthor);
    expect(addedAuthor).toEqual({
      authorId: 4,
      name: "J.K. Rowling",
      book: "Harry Potter",
    });
  });
});
