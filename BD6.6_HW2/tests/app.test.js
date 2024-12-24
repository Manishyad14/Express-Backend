
const request = require("supertest");
const { app } = require("../index");
const { getAllGames, getGamesById } = require("../controllers");


jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
  getGamesById: jest.fn(),
}));

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all games", () => {
    const mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);

    const result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
    expect(getAllGames).toHaveBeenCalledTimes(1);
  });

  it("Should return game by ID", () => {
    const mockedGame = {
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    };

    getGamesById.mockReturnValue(mockedGame);

    const result = getGamesById(1);
    expect(result).toEqual(mockedGame);
    expect(getGamesById).toHaveBeenCalledWith(1);
    expect(getGamesById).toHaveBeenCalledTimes(1);
  });

  it("Should return undefined for non-existent game ID", () => {
    getGamesById.mockReturnValue(undefined);

    const result = getGamesById(999);
    expect(result).toBeUndefined();
    expect(getGamesById).toHaveBeenCalledWith(999);
    expect(getGamesById).toHaveBeenCalledTimes(1);
  });
});

describe("API Endpoint Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /games should get all games", async () => {
    const mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);

    const res = await request(app).get("/games");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: mockedGames,
    });
    expect(res.body.games.length).toBe(3);
    expect(getAllGames).toHaveBeenCalledTimes(1);
  });

  it("GET /games/details/:id should get game details by id", async () => {
    const mockedGame = {
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    };

    getGamesById.mockReturnValue(mockedGame);

    const res = await request(app).get("/games/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: mockedGame,
    });
    expect(getGamesById).toHaveBeenCalledWith(1);
    expect(getGamesById).toHaveBeenCalledTimes(1);
  });

  it("GET /games/details/:id should return 404 if game not found", async () => {
    getGamesById.mockReturnValue(undefined); // Simulate not found

    const res = await request(app).get("/games/details/999"); // Assuming 999 doesn't exist
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: "Game not found",
    });
    expect(getGamesById).toHaveBeenCalledWith(999);
    expect(getGamesById).toHaveBeenCalledTimes(1);
  });

  it("GET /games/details/:id should return 400 for invalid ID format", async () => {
    const res = await request(app).get("/games/details/abc"); // Invalid ID
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Invalid game ID format",
    });
  });
});
