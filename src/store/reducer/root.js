import { combineReducers } from "redux";

import sideMenu from './sideMenu'
import games from './games'
import header from './header'
import music from './music'
import words from './words'
import date from './date'
import photo from './photo'
import movies from './movies'
import tv from './tv'
import user from './user'
import todoList from './todoList'

export default combineReducers({
  sideMenu,
  games,
  header,
  music,
  words,
  date,
  photo,
  movies,
  tv,
  user,
  todoList
})