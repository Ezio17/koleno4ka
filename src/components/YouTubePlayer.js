import React from 'react'
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import { AiFillCloseCircle } from "react-icons/ai";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  title: {
    fontSize: '16px',
    textAlign: 'center',
    color: theme.palette.grey.main,
    marginTop: '0px',
  },
  close: {
    position: 'absolute',
    cursor: 'pointer',
    top: '-20px',
    right: '-8px',
    color: theme.palette.secondary.main
  },
  block: {
    position: 'relative',
    margin: '10px',
  }
}));

const YouTubePlayer = ({ video, deleteVideo }) => {
  const opts = {
    height: '180px',
    width: '100%',
    controls: 2
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Grid container xs={12}>
        {video.map(item => (
          <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
            <div className={classes.block}>
              <Tooltip title='Удалить видео'>
                <IconButton onClick={() => deleteVideo(item._id)} className={classes.close} edge="end" aria-label="delete">
                  <AiFillCloseCircle />
                </IconButton>
              </Tooltip>
              <YouTube videoId={item.id} opts={opts} />
              <h3 className={classes.title}>{item.title}</h3>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default YouTubePlayer