import { all, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

import * as type from '../constants/games';
import { searchGame, setGames } from "../actions/games";

export function* searchGames({ search }) {
  try {
    if (search === '') {
      return yield put(searchGame([]))
    }

    const data = yield axios.get(`https://api.rawg.io/api/games?page_size=5&search=${search}`)
      .then(response => {
        return response.data;
      });

    if (data.count === 0) {
      return yield put(searchGame('пусто'))
    }

    yield put(searchGame(data.results));
  } catch (e) {
    console.log(e)
  }
}

export function* addSearchGames({ game }) {
  try {
    const data = yield axios.post(`https://koleno4ka.herokuapp.com/games`, {
      name: game.name,
      img: game.background_image
    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(setGames(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getGames() {
  try {
    const data = yield axios.get(`https://koleno4ka.herokuapp.com/games`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(setGames(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteGame({ id }) {
  try {
    const data = yield axios.delete(`https://koleno4ka.herokuapp.com/games/${id}`, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem('token'))
      }
    }).then(response => {
      return response.data;
    });

    yield put(setGames(data))
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeEvery(type.GET_SEARCH_GAME, search => searchGames(search)),
    yield takeEvery(type.ADD_SEARCH_GAME, game => addSearchGames(game)),
    yield takeEvery(type.GET_GAMES, () => getGames()),
    yield takeEvery(type.DELETE_GAME, (id) => deleteGame(id)),
  ])
}