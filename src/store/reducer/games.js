import { SEARCH_GAME, LOADING_SEARCH, SET_GAMES } from '../constants/games'

const initialValues = {
  isLoadSearch: true,
  searchGames: [],
  games: []
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case SEARCH_GAME: {
      return {
        ...state,
        searchGames: action.searchGames,
        isLoadSearch: true
      }
    }

    case LOADING_SEARCH: {
      return {
        ...state,
        isLoadSearch: action.load
      }
    }

    case SET_GAMES: {
      return {
        ...state,
        games: action.games
      }
    }

    default: {
      return state
    }
  }
}