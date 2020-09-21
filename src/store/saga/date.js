import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/date';
import * as action from '../actions/date'

export function* getDate() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/date`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setDate(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addDate({ title, date }) {
  if (!title) return;
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/date`, {
      title,
      date
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setDate(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteDate({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/date/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setDate(data))
  } catch (e) {
    console.log(e)
  }
}


export default function* () {
  yield all([
    yield takeEvery(type.GET_DATE, () => getDate()),
    yield takeEvery(type.ADD_DATE, (title, date) => addDate(title, date)),
    yield takeEvery(type.DELETE_DATE, id => deleteDate(id)),
  ])
}