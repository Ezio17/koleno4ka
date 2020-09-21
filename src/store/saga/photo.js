import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import FormData from 'form-data'

import * as type from '../constants/photo';
import * as action from '../actions/photo';

export function* getPhoto() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/photo`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setPhoto(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addPhoto({ img, category }) {
  try {
    let data = new FormData();
    data.append('image', img);
    data.append('category', category)
    const photo = yield axios({
      method: 'post',
      url: `https://koleno4ka.herokuapp.com/photo`,
      data,
      headers: {
        "auth-token": JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setPhoto(photo))
  } catch (e) {
    console.log(e)
  }
}

export function* deletePhoto({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/photo/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setPhoto(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.GET_PHOTO, () => getPhoto()),
    yield takeEvery(type.ADD_PHOTO, (img, category) => addPhoto(img, category)),
    yield takeEvery(type.DELETE_PHOTO, id => deletePhoto(id)),
  ])
}