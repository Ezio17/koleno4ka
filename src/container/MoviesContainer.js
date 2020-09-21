import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Movies from '../page/Movies'
import { setHeader } from '../store/actions/header'
import * as type from '../store/constants/movies'
import * as actions from '../store/actions/movies';

const MoviesContainer = ({ setHeader, searchMovies, setSearchMovies, movies,
  getMovies, addMovies, deleteMovies, getMovie, movie, addDate, addRating, changeEvent, setMovie }) => {
  useEffect(() => {
    setHeader('Фильмы')
  }, [])

  return (
    <Movies
      searchMovies={searchMovies}
      setSearchMovies={setSearchMovies}
      movies={movies}
      getMovies={getMovies}
      addMovies={addMovies}
      deleteMovies={deleteMovies}
      getMovie={getMovie}
      movie={movie}
      addDate={addDate}
      addRating={addRating}
      changeEvent={changeEvent}
      setMovie={setMovie}
    />
  )
}

const mapStateToProps = state => ({
  searchMovies: state.movies.searchMovies,
  movies: state.movies.movies,
  movie: state.movies.movie
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  setSearchMovies: search => dispatch({ type: type.SEARCH_MOVIES, search }),
  getMovies: () => dispatch({ type: type.GET_MOVIES }),
  addMovies: (id, title, image, event) => dispatch({ type: type.ADD_MOVIES, id, title, image, event }),
  deleteMovies: (id) => dispatch({ type: type.DELETE_MOVIES, id }),
  getMovie: id => dispatch({ type: type.GET_MOVIE, id }),
  addDate: (date, id) => dispatch({ type: type.ADD_DATE, date, id }),
  addRating: (rating, name, id) => dispatch({ type: type.ADD_RATING, rating, name, id }),
  changeEvent: (id) => dispatch({ type: type.CHANGE_EVENT, id }),
  setMovie: movie => dispatch(actions.setMovie(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer)