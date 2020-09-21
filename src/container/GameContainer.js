import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Game from '../page/Game'
import { setHeader } from '../store/actions/header'
import * as gamesConst from '../store/constants/games'
import { loadSearch } from '../store/actions/games'

const GameContainer = ({ setHeader, getSearchGames, isLoading, searchGames,
  loadSearch, addSearchGame, getGames, games, deleteGame }) => {
  useEffect(() => {
    setHeader('Игры')
  }, [])

  return (
    <Game
      searchGame={getSearchGames}
      isLoading={isLoading}
      searchGames={searchGames}
      loadSearch={loadSearch}
      addSearchGame={addSearchGame}
      getGames={getGames}
      games={games}
      deleteGame={deleteGame}
    />
  )
}

const mapStateToProps = state => {
  return ({
    isLoading: state.games.isLoadSearch,
    searchGames: state.games.searchGames,
    games: state.games.games
  })
}

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  getSearchGames: search => {
    dispatch({ type: gamesConst.GET_SEARCH_GAME, search })
  },
  loadSearch: load => dispatch(loadSearch(load)),
  addSearchGame: game => dispatch({ type: gamesConst.ADD_SEARCH_GAME, game }),
  getGames: () => dispatch({ type: gamesConst.GET_GAMES }),
  deleteGame: id => dispatch({ type: gamesConst.DELETE_GAME, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)