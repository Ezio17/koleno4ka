import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/tv';
import * as action from '../actions/tv';

export function* searchTv({ search }) {
  try {
    if (search === '') {
      return yield put(action.setSearchTv([]))
    }

    const data = yield axios.get(`https://api.themoviedb.org/3/search/tv?api_key=29574201b32259e0b6282b3bb21eb28c&language=ru&page=1&query=${search}&include_adult=false`)
      .then(response => {
        return response.data;
      });

    if (data.results.length === 0) {
      return yield put(action.setSearchTv('пусто'))
    }

    return yield put(action.setSearchTv(data.results.sort((a, b) => b.popularity - a.popularity)))
  } catch (e) {
    console.log(e)
  }
}

export function* getTv() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/tv`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addTv({ id, title, image, event }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/tv`, {
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

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteTv({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/tv/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getTvInfo({ id }) {
  try {
    const data = yield axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=29574201b32259e0b6282b3bb21eb28c&language=ru`)
      .then(response => {
        return response.data;
      });

    yield put(action.setTvInfo(data))
  } catch (e) {
    console.log(e)
  }
}

export function* eventChange({ id }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/tv/event/${id}`,
      {},
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addRating({ rating, name, id }) {
  console.log(rating, name, id)
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/tv/rating/${id}`,
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

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addDate({ date, id }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/tv/date/${id}`,
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

    yield put(action.setTv(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.SEARCH_TV, search => searchTv(search)),
    yield takeEvery(type.GET_TV, () => getTv()),
    yield takeEvery(type.ADD_TV, (id, title, image, event) => addTv(id, title, image, event)),
    yield takeEvery(type.DELETE_TV, (id) => deleteTv(id)),
    yield takeEvery(type.GET_TV_INFO, id => getTvInfo(id)),
    yield takeEvery(type.CHANGE_EVENT, id => eventChange(id)),
    yield takeEvery(type.ADD_RATING_TV, (rating, name, id) => addRating(rating, name, id)),
    yield takeEvery(type.ADD_DATE_TV, (date, id) => addDate(date, id)),
  ])
}