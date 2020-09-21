import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AiFillCloseCircle } from "react-icons/ai";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  block: {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '15px',
    position: 'relative',


  },
  img: {
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  }
}));

const GameBlock = ({ games, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Grid container xs={12}>
        {games.map(game => (
          <Grid key={game._id} item sm={12} md={6} lg={4} xl={3}>
            <div className={classes.block}>
              <Tooltip title='Удалить игру'>
                <IconButton className={classes.close} onClick={() => onDelete(game._id)} edge="end" aria-label="delete">
                  <AiFillCloseCircle />
                </IconButton>
              </Tooltip>
              <img className={classes.img} alt='game title' src={game.img} />
              <h4 className={classes.text}>{game.name}</h4>
            </div>
          </Grid>
        ))}
      </Grid>
    </div >
  )
}

export default GameBlock