const express = require("express");
const app = express();
app.use(express.json());

let games = [
  { id: 1, title: "The Legend of Zelda", genre: "Adventure", developer: "Nintendo" },
  { id: 2, title: "Super Mario Bros", genre: "Platformer", developer: "Nintendo" },
];

let developers = [
  { id: 1, name: "Nintendo", country: "Japan" },
  { id: 2, name: "Valve", country: "USA" },
];

// Get All Games
app.get("/games", (req, res) => {
  res.json(games);
});

// Get Game by ID
app.get("/games/details/:id", (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");
  res.json(game);
});

// Add a New Game
app.post("/games/new", (req, res) => {
  const { title, genre, developer } = req.body;
  const newGame = { id: games.length + 1, title, genre, developer };
  games.push(newGame);
  res.json(newGame);
});

// Get Developer by ID
app.get("/developers/details/:id", (req, res) => {
  const developer = developers.find((d) => d.id === parseInt(req.params.id));
  if (!developer) return res.status(404).send("Developer not found");
  res.json(developer);
});

// Add a New Developer
app.post("/developers/new", (req, res) => {
  const { name, country } = req.body;
  const newDeveloper = { id: developers.length + 1, name, country };
  developers.push(newDeveloper);
  res.json(newDeveloper);
});

module.exports = app;
