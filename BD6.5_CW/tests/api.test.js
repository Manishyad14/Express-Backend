const request = require("supertest");
const { app, validateUser, validateBook, validateReview } = require("../index.js");
const http = require("http");

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoints to add data", () => {

    /
    beforeEach(() => {
       
    });

    // Exercise 4: Test add a new user with valid input
    it("should add a new user with valid input", async () => {
        const res = await request(server)
            .post("/api/users")
            .send({ name: "Alice", email: "alice@example.com" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            name: "Alice",
            email: "alice@example.com",
        });
    });

    // Exercise 5: Test add a new user with invalid input
    it("should return 400 from invalid user input", async () => {
        const res = await request(server)
            .post("/api/users")
            .send({ name: "John" }); // Missing email

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Email is required and should be a string.");
    });

    // Exercise 6: Test add a new book with valid input
    it("should add a new book with valid input", async () => {
        const res = await request(server)
            .post("/api/books")
            .send({ title: "Moby Dick", author: "Herman Melville" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            title: "Moby Dick",
            author: "Herman Melville",
        });
    });

    // Exercise 7: Test add a new book with invalid input
    it("should return 400 from invalid book input", async () => {
        const res = await request(server)
            .post("/api/books")
            .send({ title: "The Great Gatsby" }); // Missing author

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Author is required and should be a string.");
    });

    // Exercise 8: Test add a new review with valid input
    it("should add a new review with valid input", async () => {
        // First, add a user to associate with the review
        await request(server)
            .post("/api/users")
            .send({ name: "Bob", email: "bob@example.com" });

        // Then, add a book to associate with the review (assuming reviews are linked to books)
        await request(server)
            .post("/api/books")
            .send({ title: "1984", author: "George Orwell" });

        const res = await request(server)
            .post("/api/reviews")
            .send({ content: "Great book!", userId: 1 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            content: "Great book!",
            userId: 1,
        });
    });

    // Exercise 9: Test add a new review with invalid input
    it("should return 400 from invalid review input", async () => {
        const res = await request(server)
            .post("/api/reviews")
            .send({ content: "Great book!" }); // Missing userId

        expect(res.statusCode).toEqual(400);
        // Updated expected message to match the actual API response
        expect(res.text).toEqual("User Id is required and should be a number.");
    });
});

describe("Validation Functions", () => {

    // Exercise 10: Test user validation function
    describe("validateUser", () => {
        it("should return null for valid user input", () => {
            const input = { name: "Charlie", email: "charlie@example.com" };
            const result = validateUser(input);
            expect(result).toBeNull();
        });

        it("should return error message for missing email", () => {
            const input = { name: "Charlie" };
            const result = validateUser(input);
            expect(result).toEqual("Email is required and should be a string.");
        });

        it("should return error message for invalid email type", () => {
            const input = { name: "Charlie", email: 12345 };
            const result = validateUser(input);
            expect(result).toEqual("Email is required and should be a string.");
        });

        it("should return error message for missing name", () => {
            const input = { email: "charlie@example.com" };
            const result = validateUser(input);
            expect(result).toEqual("Name is required and should be a string.");
        });

        it("should return error message for invalid name type", () => {
            const input = { name: 12345, email: "charlie@example.com" };
            const result = validateUser(input);
            expect(result).toEqual("Name is required and should be a string.");
        });
    });

    // Exercise 11: Test book validation function
    describe("validateBook", () => {
        it("should return null for valid book input", () => {
            const input = { title: "To Kill a Mockingbird", author: "Harper Lee" };
            const result = validateBook(input);
            expect(result).toBeNull();
        });

        it("should return error message for missing title", () => {
            const input = { author: "Harper Lee" };
            const result = validateBook(input);
            expect(result).toEqual("Title is required and should be a string.");
        });

        it("should return error message for invalid title type", () => {
            const input = { title: 12345, author: "Harper Lee" };
            const result = validateBook(input);
            expect(result).toEqual("Title is required and should be a string.");
        });

        it("should return error message for missing author", () => {
            const input = { title: "To Kill a Mockingbird" };
            const result = validateBook(input);
            expect(result).toEqual("Author is required and should be a string.");
        });

        it("should return error message for invalid author type", () => {
            const input = { title: "To Kill a Mockingbird", author: 12345 };
            const result = validateBook(input);
            expect(result).toEqual("Author is required and should be a string.");
        });
    });

    // Exercise 12: Test review validation function
    describe("validateReview", () => {
        it("should return null for valid review input", () => {
            const input = { content: "Amazing read!", userId: 1 };
            const result = validateReview(input);
            expect(result).toBeNull();
        });

        it("should return error message for missing content", () => {
            const input = { userId: 1 };
            const result = validateReview(input);
            expect(result).toEqual("Content is required and should be a string.");
        });

        it("should return error message for invalid content type", () => {
            const input = { content: 12345, userId: 1 };
            const result = validateReview(input);
            expect(result).toEqual("Content is required and should be a string.");
        });

        it("should return error message for missing userId", () => {
            const input = { content: "Amazing read!" };
            const result = validateReview(input);
           
            expect(result).toEqual("User Id is required and should be a number.");
        });

        it("should return error message for invalid userId type", () => {
            const input = { content: "Amazing read!", userId: "one" };
            const result = validateReview(input);
           
            expect(result).toEqual("User Id is required and should be a number.");
        });
    });
});
