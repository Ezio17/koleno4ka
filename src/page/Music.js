import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-lodash-debounce'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { GrAddCircle } from "react-icons/gr";

import YouTubePlayer from '../components/YouTubePlayer'

const useStyles = makeStyles((theme) => ({
  wrapperInput: {
    marginBottom: '15px',
  },
  search: {
    width: '400px',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  searchText: {
    width: '400px',
    boxSizing: 'border-box',
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
    boxSizing: 'border-box',

    '& span': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  },
  noFindGame: {
    fontSize: '20px',
    display: 'flex',
    justifyContent: "center",
    textAlign: 'center',
    color: theme.palette.grey.main
  },
}));

const Music = ({ getSearchMusic, searchVideo, addMusic, video, getMusic, deleteVideo }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    getMusic();
  }, [])

  useEffect(() => {
    getSearchMusic(searchValue.trim())
  }, [debouncedValue]);

  const handleOnBlur = () => {
    setTimeout(() => getSearchMusic(''), 300)
  }

  const hadleOnFocus = () => {
    getSearchMusic(searchValue.trim())
  }

  return (
    <main className={classes.main}>
      <div className={classes.wrapperInput}>
        <TextField onFocus={hadleOnFocus} onBlur={handleOnBlur} className={classes.search} className={classes.search} label="Добавить музыку" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        {typeof searchVideo !== 'string' && searchVideo.length > 0 && (
          <div className={classes.searchText}>
            <List style={{ paddingBottom: '0px' }}>
              {searchVideo.map(video => (
                <ListItem className={classes.list} key={video.id.videoId}>
                  <ListItemAvatar>
                    <Avatar src={video.snippet.thumbnails.default.url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={video.snippet.title}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Добавить музыку'>
                      <IconButton onClick={() => addMusic(video.id.videoId, video.snippet.title)} edge="end" aria-label="delete">
                        <GrAddCircle className={classes.buttonAdd} />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {searchVideo === 'пусто' && (
          <div className={classes.searchText}>
            <div className={classes.noFindGame}>
              <h3>Такой музыки нет.</h3>
            </div>
          </div>
        )}
      </div>
      <YouTubePlayer deleteVideo={deleteVideo} video={video} />
    </main>
  )
}

export default Music