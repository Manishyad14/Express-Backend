const cors = require("cors");
const express = require("express");
const { getAllMovies, getMoviesById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

//Endpoint to get all employees  :
app.get("/movies", async (req, res) => {
  const movies = getAllMovies();
  res.json({ movies });
});

//Endpoint to get employees details by id :
app.get("/movies/details/:id", async (req, res) => {
  let movie = getMoviesById(parseInt(req.params.id));
  res.json({
    movie,
  });
});

module.exports = { app };
