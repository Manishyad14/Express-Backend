const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


let movies = [
  { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
  { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
];

// Function to get all movies
const getMovies = () => movies;

// Function to get a movie by ID
const getMovieById = (id) => movies.find((movie) => movie.id === id);

// Function to add a new movie
const addMovie = (movie) => {
  movies.push(movie);
  return movie;
};

// Endpoint to get all movies
app.get('/movies', (req, res) => {
  res.json(getMovies());
});

// Endpoint to get movie by ID
app.get('/movies/details/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = getMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Endpoint to add a new movie
app.post('/movies/new', (req, res) => {
  const { id, title, director } = req.body;
  const newMovie = { id, title, director };
  const addedMovie = addMovie(newMovie);
  res.status(201).json(addedMovie);
});

module.exports = { app, getMovies, getMovieById, addMovie };
