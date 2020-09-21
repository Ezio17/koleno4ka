import * as type from '../constants/movies';

const initialValue = {
  movies: [],
  searchMovies: [],
  movie: {}
}

export default (state = initialValue, action) => {
  switch (action.type) {
    case type.SET_SEARCH_MOVIES: {
      return {
        ...state,
        searchMovies: action.searchMovies
      }
    }

    case type.SET_MOVIES: {
      return {
        ...state,
        movies: action.movies
      }
    }

    case type.SET_MOVIE: {
      return {
        ...state,
        movie: action.movie
      }
    }

    default: {
      return state
    }
  }
}