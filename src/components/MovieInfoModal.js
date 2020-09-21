import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { GrLinkDown } from "react-icons/gr";
import { BsPencil } from "react-icons/bs";
import { IoIosPeople, IoMdMan, IoMdWoman, IoMdPeople } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactStars from 'react-stars';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

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

const MovieInfoModal = ({ isModalOpen, handleClose, movie, activeMoiveFromMovies, isTv, setDate, addDate, width, date, handleAddDate, addRating }) => {
  const classes = useStyles();
  const userName = JSON.parse(localStorage.getItem('user'));

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <img
          className={classes.infoAvatar}
          src={movie.poster_path ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}` :
            require('../assets/img/person.png')}
          alt={movie.title}
        />
        <div className={classes.infoWrapper}>
          <h3 className={classes.movieTitle}>{movie.title || movie.name}</h3>
          <p className={classes.description}>{movie.overview}</p>
          <Accordion>
            <AccordionSummary
              expandIcon={<GrLinkDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Дата просмотра</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {activeMoiveFromMovies[0]?.date ? (
                <List style={{ width: '100%' }} component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemText className={classes.dateWatchedDate} primary={`Дата просмотра: ${activeMoiveFromMovies[0]?.date}`} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Изменить">
                        <IconButton onClick={() => addDate(null, activeMoiveFromMovies[0].id)} edge="end" aria-label="edit">
                          <BsPencil />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ) : (
                  <Grid style={{ display: 'flex', alignItems: 'flex-end' }} container xs={12} spacing={2}>
                    <Grid item xs={7} sm={4}>
                      <Typography>
                        Добавить дату:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <DatePicker
                          selected={date}
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          onChange={(date) => setDate(date)}
                          customInput={<TextField />}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button style={{ width: '100%' }} onClick={handleAddDate} variant="outlined" color="primary">
                        Добавить
                     </Button>
                    </Grid>
                  </Grid>
                )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<GrLinkDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Оценка</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0', flexWrap: 'wrap' }}>
              {activeMoiveFromMovies[0]?.ratingKolya && activeMoiveFromMovies[0]?.ratingLena ? (
                <List style={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      {userName === 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText primary={`Твоя оценка: ${userName === 'Kolya' ? activeMoiveFromMovies[0]?.ratingKolya :
                      activeMoiveFromMovies[0]?.ratingLena}`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon >
                      {userName !== 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${userName === 'Kolya' ? 'Леночки' : 'Колечки'} оценка: ${userName !== 'Kolya' ? activeMoiveFromMovies[0]?.ratingKolya :
                        activeMoiveFromMovies[0]?.ratingLena}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <IoMdPeople className={classes.svg} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Наша средняя оценка: ${((+activeMoiveFromMovies[0]?.ratingKolya + +activeMoiveFromMovies[0]?.ratingLena) / 2).toFixed(1)}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <IoIosPeople className={classes.svg} />
                    </ListItemIcon>
                    <ListItemText primary={`Оценка фильма: ${movie.vote_average}`} />
                  </ListItem>
                  <Divider />
                  {isTv && (
                    <Button
                      style={{ width: '100%', marginTop: '5px' }}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        addRating(null, 'Kolya', movie.id)
                        addRating(null, 'Lena', movie.id)
                      }}
                    >
                      Обновить голосование
                    </Button>
                  )}
                </List>
              ) : userName === 'Kolya' && activeMoiveFromMovies[0]?.ratingKolya ? (
                <List style={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      {userName === 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText primary={`Твоя оценка: ${userName === 'Kolya' ? activeMoiveFromMovies[0]?.ratingKolya :
                      activeMoiveFromMovies[0]?.ratingLena}`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon >
                      {userName !== 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`Дождись оценки Леночки`}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ) : userName === 'Lena' && activeMoiveFromMovies[0]?.ratingLena ? (
                <List style={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      {userName === 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText primary={`Твоя оценка: ${userName === 'Kolya' ? activeMoiveFromMovies[0]?.ratingKolya :
                      activeMoiveFromMovies[0]?.ratingLena}`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon >
                      {userName !== 'Kolya' ? <IoMdMan className={classes.svg} /> : <IoMdWoman className={classes.svg} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={`Дождись оценки Колечки`}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ) : (
                      <>
                        <Typography className={classes.ratingTitle}>
                          Оценить:
                        </Typography>
                        <ReactStars
                          count={10}
                          onChange={(rating) => {
                            addRating(rating, userName, movie.id)
                          }}
                          size={isWidthDown('xs', width) ? 28 : 32}
                          color2={'#ffd700'}
                        />
                      </>
                    )
              }

            </AccordionDetails>
          </Accordion>
          {isWidthDown('xs', width) && (
            <Button onClick={handleClose} style={{ width: '100%', marginTop: '5px' }} variant="outlined" color="primary">
              Закрыть
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default withWidth()(MovieInfoModal)