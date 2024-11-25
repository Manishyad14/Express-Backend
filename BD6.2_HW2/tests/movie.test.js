const { getMovies, getMovieById, addMovie } = require('../index');

jest.mock('../index', () => {
  const originalModule = jest.requireActual('../index');
  return {
    ...originalModule,
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
    addMovie: jest.fn(),
  };
});

describe('Movies API Functions', () => {
  const mockMovies = [
    { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
    { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
    { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all movies
  test('getMovies should return all movie records', () => {
    getMovies.mockReturnValue(mockMovies);

    const result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
    expect(getMovies).toHaveBeenCalledTimes(1);
  });

  // Exercise 5: Test get movie by ID
  test('getMovieById should return the correct movie record for a valid ID', () => {
    const mockMovie = { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' };
    getMovieById.mockReturnValue(mockMovie);

    const result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get movie by non-existent ID
  test('getMovieById should return undefined for a non-existent ID', () => {
    getMovieById.mockReturnValue(undefined);

    const result = getMovieById(999);
    expect(result).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test add new movie
  test('addMovie should add a new movie record', () => {
    const newMovie = { id: 4, title: 'Inception', director: 'Christopher Nolan' };
    addMovie.mockReturnValue(newMovie);

    const result = addMovie(newMovie);
    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
