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
import Button from '@material-ui/core/Button';
import moment from 'moment';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import MoviesCard from '../components/MoviesCard'
import MovieInfoModal from '../components/MovieInfoModal';

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
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: '1',
    maxHeight: '320px',
    overflowY: 'scroll',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      position: 'relative',
    },
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
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    display: 'flex',
    overflow: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: '90%',
      flexDirection: 'column',
      marginTop: 10,
      marginBottom: 10,
      height: '90vh'
    },
  },
  infoWrapper: {
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
  },
  infoAvatar: {
    marginRight: '15px',
    height: 342,
    alignSelf: 'center',

    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    },
  },
  movieTitle: {
    fontSize: '26px',
    marginTop: '10px',
    marginBottom: 10
  },
  ratingTitle: {
    marginRight: 15,
    marginTop: 5,
    fontSize: 20,

    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    },
  },
  wrapperSearch: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    },
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '10px'
    },
  },
  dateWatchedDate: {
    textAlign: 'center',

    '& span': {
      fontSize: 16,
    }
  },
  svg: {
    width: 30,
    height: '100%'
  },
}));

const Movies = ({ searchMovies, setSearchMovies, movies, getMovies, addMovies, deleteMovies, getMovie,
  movie, addDate, addRating, setMovie, changeEvent }) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radioMovie, setRadioMovie] = useState('просмотренный');
  const [activMoive, setActiveMovie] = useState({
    id: null,
    title: '',
    poster_path: ''
  })
  const [movieSelect, setMovieSelect] = useState('просмотренный')
  const [activeMoiveFromMovies, setActiveMoiveFromMovies] = useState([]);

  useEffect(() => {
    if (movie?.id) {
      setActiveMoiveFromMovies(movies.filter(item => item.id === movie.id))
    }
  }, [movies])

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    setSearchMovies(searchValue.trim())
  }, [debouncedValue]);

  const handleOnBlur = () => {
    setTimeout(() => setSearchMovies(''), 300)
  }

  const hadleOnFocus = () => {
    setSearchMovies(searchValue.trim())
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setMovie([]);
  }

  const handleAddDate = () => {
    addDate(moment(date).format('DD/MM/YYYY'), movie.id);
  }

  return (
    <main>
      <div className={classes.wrapperInput}>
        <div className={classes.wrapperSearch}>
          <TextField
            onFocus={hadleOnFocus}
            onBlur={handleOnBlur}
            className={classes.search}
            label="Добавить фильм"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Фильмы</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={movieSelect}
              onChange={(e) => setMovieSelect(e.target.value)}
            >
              <MenuItem value='просмотренный'>Просмотренные</MenuItem>
              <MenuItem value='посмотреть позже'>Посмотреть позже</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={open}
        >
          <DialogTitle id="confirmation-dialog-title">Добавить фильм</DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              aria-label="ringtone"
              name="ringtone"
              value={radioMovie}
              onChange={(e) => setRadioMovie(e.target.value)}
            >
              <FormControlLabel value="просмотренный" control={<Radio />} label="Просмотренный" />
              <FormControlLabel value="посмотреть позже" control={<Radio />} label="Посмотреть позже" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpen(false)} color="primary">
              Закрыть
            </Button>
            <Button onClick={() => {
              addMovies(activMoive.id, activMoive.title, activMoive.poster_path, radioMovie);
              setOpen(false)
            }} color="primary">
              Добавить
           </Button>
          </DialogActions>
        </Dialog>
        {typeof searchMovies !== 'string' && searchMovies.length > 0 && (
          <div className={classes.searchText}>
            <List style={{ paddingBottom: '0px' }}>
              {searchMovies.map(movie => (
                <ListItem className={classes.list} key={movie.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={movie.poster_path ? `http://image.tmdb.org/t/p/w92/${movie.poster_path}` :
                        require('../assets/img/person.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={movie.title}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Добавить фильм'>
                      <IconButton onClick={() => {
                        setActiveMovie({
                          id: movie.id,
                          title: movie.title,
                          poster_path: movie.poster_path
                        });
                        setOpen(true)
                      }} edge="end" aria-label="add">
                        <GrAddCircle className={classes.buttonAdd} />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {searchMovies === 'пусто' && (
          <div className={classes.searchText}>
            <div className={classes.noFindGame}>
              <h3>Такого фильма нет.</h3>
            </div>
          </div>
        )}
      </div>
      <MoviesCard
        movies={movieSelect === 'посмотреть позже' ? (
          movies.filter(movie => movie.event === 'посмотреть позже')
        ) : (
            movies.filter(movie => movie.event !== 'посмотреть позже')
          )
        }
        deleteMovies={deleteMovies}
        getMovie={getMovie}
        handleOpen={handleOpen}
        movieSelect={movieSelect}
        changeEvent={changeEvent}
        setActiveMoiveFromMovies={setActiveMoiveFromMovies}
      />
      <MovieInfoModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        movie={movie}
        activeMoiveFromMovies={activeMoiveFromMovies}
        setDate={setDate}
        addDate={addDate}
        date={date}
        handleAddDate={handleAddDate}
        addRating={addRating}
      />
    </main >
  )
}

export default Movies