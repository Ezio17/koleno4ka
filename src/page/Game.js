import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-lodash-debounce';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { GrAddCircle } from "react-icons/gr";

import GameBlock from '../components/GameBlock'

const useStyles = makeStyles((theme) => ({
  wrapperInput: {
    marginBottom: '15px',
  },
  search: {
    width: '300px',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  searchText: {
    width: '300px',
    minHeight: '70px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: '1'
  },
  buttonAdd: {
    color: theme.palette.secondary.main
  },
  list: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  noFindGame: {
    fontSize: '20px',
    display: 'flex',
    justifyContent: "center",
    textAlign: 'center',
    color: theme.palette.grey.main
  }
}));

const Game = ({ searchGame, searchGames, loadSearch, addSearchGame, getGames, games, deleteGame }) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    getGames()
  }, [])

  useEffect(() => {
    loadSearch(false);
    searchGame(searchValue.trim())
  }, [debouncedValue]);

  const getGame = (game) => {
    addSearchGame(game)
  }

  const handleOnBlur = () => {
    setTimeout(() => searchGame(''), 300)
  }

  const hadleOnFocus = () => {
    searchGame(searchValue.trim())
  }

  return (
    <main>
      <div className={classes.wrapperInput}>
        <TextField onFocus={hadleOnFocus} onBlur={handleOnBlur} className={classes.search} label="Добавить игру" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {typeof searchGames !== 'string' && searchGames.length > 0 && (
          <div className={classes.searchText}>
            <List style={{ paddingBottom: '0px' }}>
              {searchGames.map(game => (
                <ListItem className={classes.list} key={game.id}>
                  <ListItemAvatar>
                    <Avatar src={game.background_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={game.name}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Добавить игру'>
                      <IconButton onClick={() => getGame(game)} edge="end" aria-label="delete">
                        <GrAddCircle className={classes.buttonAdd} />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {searchGames === 'пусто' && (
          <div className={classes.searchText}>
            <div className={classes.noFindGame}>
              <h3>Такой игры нет.</h3>
            </div>
          </div>
        )}
      </div>
      <GameBlock games={games} onDelete={deleteGame} />
    </main>
  )
}

export default Game