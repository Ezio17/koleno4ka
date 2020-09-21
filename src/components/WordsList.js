import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { RiDeleteBin6Line } from "react-icons/ri";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    color: theme.palette.grey.main,
  },
  title: {
    textAlign: 'center'
  }
}));

const WordsList = ({ words, deleteWords }) => {
  const classes = useStyles();

  return (
    <div>
      <List>
        {words.map(word => {
          return (
            <div key={word._id}>
              <ListItem>
                <div className={classes.textWrapper}>
                  <p className={classes.title}>{word.title} - <b>{word.author ? word.author : word.date}</b></p>
                </div>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => deleteWords(word._id)} edge="end" aria-label="delete">
                    <RiDeleteBin6Line />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </List>
    </div>
  )
}

export default WordsList