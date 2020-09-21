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
import Modal from '@material-ui/core/Modal';
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
import Button from '@material-ui/core/Button';
import moment from 'moment';

import TvCard from '../components/TvCard'
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
    overflowY: 'scroll',
    margin: '20px 0'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '10px'
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
}));

const TvSeries = ({ searchTv, tv, setSearchTv, getTv, addTv, deleteTv, tvInfo, getTvInfo, changeEvent, addDate, addRating }) => {
  const classes = useStyles();
  const userName = JSON.parse(localStorage.getItem('user'));

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [radioMovie, setRadioMovie] = useState('просмотренный');
  const [activMoive, setActiveMovie] = useState({
    id: null,
    title: '',
    poster_path: ''
  })
  const [movieSelect, setMovieSelect] = useState('просмотренный')
  const [date, setDate] = useState(new Date());
  const [activeMoiveFromMovies, setActiveMoiveFromMovies] = useState([]);

  useEffect(() => {
    if (tvInfo?.id) {
      setActiveMoiveFromMovies(tv.filter(item => item.id === tvInfo.id))
    }
  }, [tv])

  useEffect(() => {
    getTv()
  }, [])

  useEffect(() => {
    setSearchTv(searchValue.trim())
  }, [debouncedValue]);

  const handleOnBlur = () => {
    setTimeout(() => setSearchTv(''), 300)
  }

  const hadleOnFocus = () => {
    setSearchTv(searchValue.trim())
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleAddDate = () => {
    addDate(moment(date).format('DD/MM/YYYY'), tvInfo.id);
  }

  return (
    <main>
      <div className={classes.wrapperInput}>
        <div className={classes.wrapperSearch}>
          <TextField onFocus={hadleOnFocus} onBlur={handleOnBlur} className={classes.search} label="Добавить сериал" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Сериалы</InputLabel>
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
          <DialogTitle id="confirmation-dialog-title">Добавить сериал</DialogTitle>
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
              addTv(activMoive.id, activMoive.title, activMoive.poster_path, radioMovie);
              setOpen(false)
            }} color="primary">
              Добавить
           </Button>
          </DialogActions>
        </Dialog>
        {typeof searchTv !== 'string' && searchTv.length > 0 && (
          <div className={classes.searchText}>
            <List style={{ paddingBottom: '0px' }}>
              {searchTv.map(movie => (
                <ListItem className={classes.list} key={movie.id}>
                  <ListItemAvatar>
                    <Avatar src={movie.poster_path ? `http://image.tmdb.org/t/p/w92/${movie.poster_path}` : require('../assets/img/person.png')} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={movie.name}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Добавить сериал'>
                      <IconButton onClick={() => {
                        setActiveMovie({
                          id: movie.id,
                          title: movie.name,
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

        {searchTv === 'пусто' && (
          <div className={classes.searchText}>
            <div className={classes.noFindGame}>
              <h3>Такого сериала нет.</h3>
            </div>
          </div>
        )}
      </div>
      <TvCard
        tv={movieSelect === 'посмотреть позже' ? (
          tv.filter(movie => movie.event === 'посмотреть позже')
        ) : (
            tv.filter(movie => movie.event !== 'посмотреть позже')
          )}
        deleteTv={deleteTv}
        handleOpen={handleOpen}
        tvInfo={tvInfo}
        getTvInfo={getTvInfo}
        changeEvent={changeEvent}
        movieSelect={movieSelect}
        setActiveMoiveFromMovies={setActiveMoiveFromMovies}
      />
      <MovieInfoModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        setDate={setDate}
        date={date}
        addDate={addDate}
        handleAddDate={handleAddDate}
        addRating={addRating}
        movie={tvInfo}
        activeMoiveFromMovies={activeMoiveFromMovies}
        isTv={true}
      />
    </main>
  )
}

export default TvSeries