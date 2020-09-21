import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/movies';
import * as action from '../actions/movies';

export function* searchMovies({ search }) {
  try {
    if (search === '') {
      return yield put(action.setSearchMovies([]))
    }

    const data = yield axios.get(`https://api.themoviedb.org/3/search/movie?api_key=29574201b32259e0b6282b3bb21eb28c&language=ru&query=${search}&page=1&include_adult=false`)
      .then(response => {
        return response.data;
      });

    if (data.results.length === 0) {
      return yield put(action.setSearchMovies('пусто'))
    }

    return yield put(action.setSearchMovies(data.results.sort((a, b) => b.popularity - a.popularity)))
  } catch (e) {
    console.log(e)
  }
}

export function* getMovies() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/movies`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addMovies({ id, title, image, event }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/movies`, {
      id,
      title,
      image,
      event
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteMovies({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/movies/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getMovie({ id }) {
  try {
    const data = yield axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=29574201b32259e0b6282b3bb21eb28c&language=ru`)
      .then(response => {
        return response.data;
      });

    yield put(action.setMovie(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addDate({ date, id }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/movies/date/${id}`,
      {
        date,
      },
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addRating({ rating, name, id }) {
  console.log(rating, name, id)
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/movies/rating/${id}`,
      {
        rating,
        name
      },
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* eventChange({ id }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/movies/event/${id}`,
      {},
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setMovies(data))
  } catch (e) {
    console.log(e)
  }
}


export default function* () {
  yield all([
    yield takeEvery(type.SEARCH_MOVIES, search => searchMovies(search)),
    yield takeEvery(type.GET_MOVIES, () => getMovies()),
    yield takeEvery(type.DELETE_MOVIES, (id) => deleteMovies(id)),
    yield takeEvery(type.ADD_MOVIES, (id, title, image, event) => addMovies(id, title, image, event)),
    yield takeEvery(type.GET_MOVIE, id => getMovie(id)),
    yield takeEvery(type.ADD_DATE, (date, id) => addDate(date, id)),
    yield takeEvery(type.ADD_RATING, (rating, name, id) => addRating(rating, name, id)),
    yield takeEvery(type.CHANGE_EVENT, (id) => eventChange(id)),
  ])
}