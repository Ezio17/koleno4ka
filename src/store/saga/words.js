import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as type from '../constants/words';
import * as action from '../actions/words';

export function* getWords() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/words`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setWords(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addWords({ title, author }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/words`, {
      title,
      author
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setWords(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteWords({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/words/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setWords(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.GET_WORDS, () => getWords()),
    yield takeEvery(type.ADD_WORDS, (title, author) => addWords(title, author)),
    yield takeEvery(type.DELETE_WORDS, (id) => deleteWords(id)),
  ])
}