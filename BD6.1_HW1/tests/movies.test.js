const { getMovies, getMovieById, addMovie } = require("../movies.js");

describe("Movies Functions", () => {
  it("should get all Movies", () => {
    let movie = getMovies();
    expect(movie.length).toBe(4);
    expect(movie).toEqual([
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
      { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
    ]);
  });

  it("should get a movies by id", () => {
    let movie = getMovieById(1);
    expect(movie).toEqual({
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    });
  });

  it("should  return a undefined message for the movies id whihc is not present", () => {
    let movie = getMovieById(99);
    expect(movie).toBeUndefined();
  });

  it("should  add a new movie", () => {
    let newMovie = { title: "newBook", author: "newBook" };
    let addedMovie = addMovie(newMovie);
    expect(addedMovie).toEqual({ id: 5, title: "newBook", author: "newBook" });
  });
});
