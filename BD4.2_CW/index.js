import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


let db;

(async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
})();


//Exercise 1: Get all movies

async function fetchAllMovies() {  
    let query = "SELECT * FROM movies";  
    let response = await db.all(query, []);  
    return { movies: response };  
}  

app.get("/movies", async (req, res) => {  
    try {  
        let results = await fetchAllMovies();  
        if (results.movies.length === 0) {  
            return res.status(404).json({ message: "No Movies Found." });  
        }  
        res.status(200).json(results);  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
});  


//Exercise 2: Fetch movies by genre : 
async function fetchMoviesByGenre(genre) {  
  let query = "SELECT * FROM movies WHERE genre = ?";  
  let response = await db.all(query, [genre]);  
  return { movies: response };  
}  

app.get("/movies/genre/:genre", async (req, res) => {  
  try {  
      let genre = req.params.genre;  
      let results = await fetchMoviesByGenre(genre);  
      if (results.movies.length === 0) {  
          return res.status(404).json({ message: "No movie of this genre found." });  
      }  
      res.status(200).json(results);  
  } catch (error) {  
      return res.status(500).json({ error: error.message });  
  }  
});

//Exercise 3: Fetch movie by ID : 

async function fetchMovieById(id) {  
  let query = "SELECT * FROM movies WHERE id = ?";  
  let response = await db.get(query, [id]);  
  return { movie: response };  
}  

app.get("/movies/details/:id", async (req, res) => {  
  try {  
      let id = req.params.id;  
      let results = await fetchMovieById(id);  
      if (results.movie === undefined) {  
          return res.status(404).json({ message: "No movie found." });  
      }  
      res.status(200).json(results);  
  } catch (error) {  
      return res.status(500).json({ error: error.message });  
  }  
});

//Exercise 4: Fetch movies by release year : 
async function fetchMoviesByReleaseYear(releaseYear) {  
  let query = "SELECT * FROM movies WHERE release_year = ?";  
  let response = await db.all(query, [releaseYear]);  
  return { movies: response };  
}  

app.get("/movies/release-year/:year", async (req, res) => {  
  try {  
      let releaseYear = req.params.year;  
      let results = await fetchMoviesByReleaseYear(releaseYear);  
      if (results.movies.length === 0) {  
          return res.status(404).json({ message: "No movies found." });  
      }  
      res.status(200).json(results);  
  } catch (error) {  
      return res.status(500).json({ error: error.message });  
  }  
});

app.listen(3000, () => {
  console.log('Express server initialized');
});