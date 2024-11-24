const { getBookById, addBook, getBooks } = require("../book.js");

describe("Books Functions", () => {
  it("should get all books", () => {
    let books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: "1984", author: "George Orwell" },
      { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
      { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
    ]);
  });

  it("should get a book by id", () => {
    let book = getBookById(1);
    expect(book).toEqual({ id: 1, title: "1984", author: "George Orwell" });
  });

  it("should  return a undefined message for the book id whihc is not present", () => {
    let book = getBookById(99);
    expect(book).toBeUndefined();
  });

  it("should  add a new book", () => {
    let newBook = { title: "newBook", author: "newBook" };
    let addedBook = addBook(newBook);
    expect(addedBook).toEqual({ id: 5, title: "newBook", author: "newBook" });
  });
});
