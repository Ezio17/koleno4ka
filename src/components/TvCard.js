import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AiFillCloseCircle } from "react-icons/ai";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  block: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      width: '180px',
    },
  },
  img: {
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      height: '256px'
    },
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: '0 -10px',
  },
  text: {
    marginTop: '5px',
    color: 'rgb(85, 85, 85)',
    fontSize: '18px',
    textAlign: 'center'
  },
  close: {
    position: 'absolute',
    cursor: 'pointer',
    top: '-23px',
    right: '-12px',
    color: theme.palette.secondary.main
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      margin: 'auto'
    },
  }
}));

const TvCard = ({ tv, deleteTv, handleOpen, getTvInfo, changeEvent, movieSelect, setActiveMoiveFromMovies }) => {
  const classes = useStyles();

  return (
    movieSelect === 'посмотреть позже' ? (
      <Grid style={{ marginTop: '30px' }} container xs={12} spacing={3}>
        {tv.map(movie => (
          <Grid className={classes.item} key={movie._id} item sm={4} md={3} lg={2}>
            <div className={classes.block}>
              <Tooltip title='Удалить сериал'>
                <IconButton className={classes.close} onClick={(e) => {
                  e.stopPropagation();
                  deleteTv(movie._id)
                }} edge="end" aria-label="delete">
                  <AiFillCloseCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title='Добавить сериал в просмотренные'>
                <img
                  onClick={() => {
                    changeEvent(movie.id)
                  }}
                  className={classes.img}
                  alt={movie.title}
                  src={movie.image ? `http://image.tmdb.org/t/p/w185/${movie.image}` : require('../assets/img/movies.jpg')}
                />
              </Tooltip>
              <h4 className={classes.text}>{movie.title}</h4>
            </div>
          </Grid>
        ))}
      </Grid>
    ) : (
        <Grid style={{ marginTop: '30px' }} container xs={12} spacing={3}>
          {tv.map(movie => (
            <Grid className={classes.item} key={movie._id} item sm={4} md={3} lg={2}>
              <div onClick={() => {
                getTvInfo(movie.id)
                handleOpen()
                setActiveMoiveFromMovies(tv.filter(item => item.id === movie.id))
              }} key={movie._id} className={classes.block}>
                <Tooltip title='Удалить сериал'>
                  <IconButton className={classes.close} onClick={(e) => {
                    e.stopPropagation();
                    deleteTv(movie._id)
                  }} edge="end" aria-label="delete">
                    <AiFillCloseCircle />
                  </IconButton>
                </Tooltip>
                <img className={classes.img} alt={movie.title} src={movie.image ? `http://image.tmdb.org/t/p/w185/${movie.image}` : require('../assets/img/movies.jpg')} />
                <h4 className={classes.text}>{movie.title}</h4>
              </div>
            </Grid>
          ))}
        </Grid>
      )

  )
}

export default TvCard