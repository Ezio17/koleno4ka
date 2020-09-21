import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as type from '../constants/user';
import * as action from '../actions/user';

export function* login({ name, password }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/users/login`, {
      name,
      password,
    }).then(response => {
      return response.data;
    });

    if (typeof data === 'string') {
      yield put(action.setError(data))
    } else {
      console.log(data)
      yield put(action.setUser(data.name, data.token))
      localStorage.setItem('user', JSON.stringify(data.name));
      localStorage.setItem('token', JSON.stringify(data.token));
    }
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.LOGIN, (name, password) => login(name, password)),
  ])
}