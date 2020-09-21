import * as type from '../constants/movies';

export const setSearchMovies = (searchMovies) => ({
  type: type.SET_SEARCH_MOVIES,
  searchMovies
})

export const setMovies = (movies) => ({
  type: type.SET_MOVIES,
  movies
})

export const setMovie = movie => ({
  type: type.SET_MOVIE,
  movie
})