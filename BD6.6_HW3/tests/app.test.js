

const request = require("supertest");
const { app } = require("../index");
const { getAllBooks, getBooksById } = require("../controllers");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
  getBooksById: jest.fn(),
}));

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all books", () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);

    const result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
    expect(getAllBooks).toHaveBeenCalledTimes(1);
  });

  it("Should return book by ID", () => {
    const mockedBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };

    getBooksById.mockReturnValue(mockedBook);

    const result = getBooksById(1);
    expect(result).toEqual(mockedBook);
    expect(getBooksById).toHaveBeenCalledWith(1);
    expect(getBooksById).toHaveBeenCalledTimes(1);
  });

  it("Should return undefined for non-existent book ID", () => {
    getBooksById.mockReturnValue(undefined);

    const result = getBooksById(999);
    expect(result).toBeUndefined();
    expect(getBooksById).toHaveBeenCalledWith(999);
    expect(getBooksById).toHaveBeenCalledTimes(1);
  });
});

describe("API Endpoint Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /books should retrieve all books", async () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);

    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: mockedBooks,
    });
    expect(res.body.books.length).toBe(3);
    expect(getAllBooks).toHaveBeenCalledTimes(1);
  });

  it("GET /books/details/:id should retrieve book details by id", async () => {
    const mockedBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };

    getBooksById.mockReturnValue(mockedBook);

    const res = await request(app).get("/books/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: mockedBook,
    });
    expect(getBooksById).toHaveBeenCalledWith(1);
    expect(getBooksById).toHaveBeenCalledTimes(1);
  });

  it("GET /books/details/:id should return 404 if book not found", async () => {
    getBooksById.mockReturnValue(undefined); // Simulate not found

    const res = await request(app).get("/books/details/999"); // Assuming 999 doesn't exist
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: "Book not found",
    });
    expect(getBooksById).toHaveBeenCalledWith(999);
    expect(getBooksById).toHaveBeenCalledTimes(1);
  });

  it("GET /books/details/:id should return 400 for invalid ID format", async () => {
    const res = await request(app).get("/books/details/abc"); // Invalid ID
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Invalid book ID format",
    });
  });
});
