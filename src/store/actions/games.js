import { SEARCH_GAME, LOADING_SEARCH, SET_GAMES } from '../constants/games'

export const searchGame = (games) => ({
  type: SEARCH_GAME,
  searchGames: games,
})

export const loadSearch = (load) => ({
  type: LOADING_SEARCH,
  load,
})

export const setGames = games => ({
  type: SET_GAMES,
  games
})