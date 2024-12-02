const request = require("supertest");
const {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});


describe("Game and Developer API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test get all games
  it("should retrieve all games", async () => {
     jest.setTimeout(15000);
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];
    getAllGames.mockResolvedValue(mockGames);

    const result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  // Test get game by ID
  it("should retrieve a game by ID", async () => {
    const mockGame = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };
    getGameById.mockResolvedValue(mockGame);

    const result = await request(server).get("/games/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGame);
  });

  // Test get game by non-existent ID
  it("should return 404 for a non-existent game ID", async () => {
    getGameById.mockResolvedValue(null);

    const result = await request(server).get("/games/details/999");
    expect(result.statusCode).toEqual(404);
  });

  // Test add new game
  it("should add a new game", async () => {
    const newGame = {
      id: 3,
      title: "Half-Life",
      genre: "FPS",
      developer: "Valve",
    };
    addGame.mockResolvedValue(newGame);

    const result = await request(server)
      .post("/games/new")
      .send({ title: "Half-Life", genre: "FPS", developer: "Valve" });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newGame);
  });

  // Test get developer by ID
  it("should retrieve a developer by ID", async () => {
    const mockDeveloper = { id: 1, name: "Nintendo", country: "Japan" };
    getDeveloperById.mockResolvedValue(mockDeveloper);

    const result = await request(server).get("/developers/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloper);
  }, 10000);


  // Test get developer by non-existent ID
  it("should return 404 for a non-existent developer ID", async () => {
    getDeveloperById.mockResolvedValue(null);

    const result = await request(server).get("/developers/details/999");
    expect(result.statusCode).toEqual(404);
  });

  // Test add new developer
  it("should add a new developer", async () => {
    const newDeveloper = { id: 3, name: "Epic Games", country: "USA" };
    addDeveloper.mockResolvedValue(newDeveloper);

    const result = await request(server)
      .post("/developers/new")
      .send({ name: "Epic Games", country: "USA" });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newDeveloper);
  });
});
