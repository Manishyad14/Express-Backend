const request = require("supertest");
const { app, getAllReviews, getReviewById, addReview, getUserById, addUser } = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Review API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];
    getAllReviews.mockResolvedValue(mockReviews);

    const result = await request(server).get("/reviews");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviews);
  });

  it("should retrieve a review by ID", async () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };
    getReviewById.mockResolvedValue(mockReview);

    const result = await request(server).get("/reviews/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });

  it("should return null for a non-existent review ID", async () => {
    getReviewById.mockResolvedValue(null);

    const result = await request(server).get("/reviews/details/999");
    expect(result.statusCode).toEqual(404);
  });

  
  it("should add a new review", async () => {
    jest.setTimeout(10000); 
    const newReview = { id: 3, content: "Awesome!", userId: 1 };
    addReview.mockResolvedValue(newReview);

    const result = await request(server)
      .post("/reviews/new")
      .send({ content: "Awesome!", userId: 1 });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newReview);
  });


  it("should retrieve a user by ID", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
    getUserById.mockResolvedValue(mockUser);

    const result = await request(server).get("/users/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockUser);
  });

  it("should return null for a non-existent user ID", async () => {
    getUserById.mockResolvedValue(null);

    const result = await request(server).get("/users/details/999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new user", async () => {
    const newUser = { id: 3, name: "Alice Brown", email: "alice.brown@example.com" };
    addUser.mockResolvedValue(newUser);

    const result = await request(server).post("/users/new").send({
      name: "Alice Brown",
      email: "alice.brown@example.com",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newUser);
  });
});
