import { all, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/todoList';
import * as action from '../actions/todoList';

export function* getList() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/todoList`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}

export function* addTodo({ title }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/todoList`, {
      title
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteTv({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/todoList/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}

export function* changeChecked({ id }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/todoList/checked/${id}`,
      {},
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}


export function* changeTitle({ id, title }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/todoList/title/${id}`,
      { title },
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}

export function* changeEdit({ id, edit }) {
  try {
    const data = yield axios.patch(`https://koleno4ka.herokuapp.com/todoList/edit/${id}`,
      { edit },
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('token'))
        },
      }).then(response => {
        return response.data;
      });

    yield put(action.setList(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.GET_LIST, () => getList()),
    yield takeEvery(type.ADD_LIST, (title) => addTodo(title)),
    yield takeEvery(type.DELETE_LIST, (id) => deleteTv(id)),
    yield takeEvery(type.CHANGE_CHEKCED, (id) => changeChecked(id)),
    yield takeEvery(type.CHANGE_TITLE, (id, title) => changeTitle(id, title)),
    yield takeEvery(type.CHANGE_EDIT, (id, edit) => changeEdit(id, edit)),
  ])
}