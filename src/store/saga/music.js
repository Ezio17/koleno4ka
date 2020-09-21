import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/music';
import * as actions from '../actions/music'

export function* searchMusic({ search }) {
  try {
    if (search === '') {
      return yield put(actions.setSearchVideo([]))
    }

    const data = yield axios.get(` https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${search}&type=video&key=AIzaSyC3zYF7V-fbJKjy07UZuBtJF431ZnUaTy0`).then(response => {
      return response.data;
    });

    if (data.items.length === 0) {
      return yield put(actions.setSearchVideo('пусто'))
    }

    yield put(actions.setSearchVideo(data.items))
  } catch (e) {
    console.log(e);
  }
}

export function* getMusic() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/music`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(actions.setVideo(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addMusic({ id, title }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/music`, {
      id,
      title,
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(actions.setVideo(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteVideo({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/music/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(actions.setVideo(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.GET_SEARCH_MUSIC, search => searchMusic(search)),
    yield takeEvery(type.ADD_MUSIC, (id, title) => addMusic(id, title)),
    yield takeEvery(type.GET_VIDEO, () => getMusic()),
    yield takeEvery(type.DELETE_VIDEO, (id) => deleteVideo(id))
  ])
}