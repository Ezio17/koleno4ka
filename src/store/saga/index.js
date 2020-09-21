import { all, fork } from "redux-saga/effects";

import games from './games';
import music from './music';
import words from './words';
import date from './date';
import photo from './photo';
import movies from './movies';
import tv from './tv';
import user from './user';
import todoList from './todoList';

export default function* rootSaga() {
  yield all([
    fork(games),
    fork(music),
    fork(words),
    fork(date),
    fork(photo),
    fork(movies),
    fork(tv),
    fork(user),
    fork(todoList)
  ]);
}