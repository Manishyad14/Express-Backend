// index.js
const cors = require("cors");
const express = require("express");
const { getAllGames, getGamesById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/games", (req, res) => {
  try {
    const games = getAllGames();
    res.status(200).json({ games });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/games/details/:id", (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);

    if (isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game ID format" });
    }

    const game = getGamesById(gameId);

    if (game) {
      res.status(200).json({ game });
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(`Error fetching game with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
