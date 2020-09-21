import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { MdDelete } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { RiSave3Line } from "react-icons/ri";
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '50%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  title: {
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  input: {
    width: '100%'
  },
  wrapperInput: {
    display: 'flex'
  },
  done: {
    textDecoration: 'line-through',
    opacity: 0.3,

    '& span': {
      width: '83%',
      textAlign: 'center'
    }
  },
  tab: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: 6
    },
  },
  default: {
    '& span': {
      width: '83%',
      textAlign: 'center'
    }
  },
  editInput: {
    width: '93%',

    [theme.breakpoints.down('sm')]: {
      width: '85%'
    },

    [theme.breakpoints.down('xs')]: {
      width: '77%'
    },
  }
}));

const TodoList = ({ todoList, getTodos, addTodos, deleteTodos, changeChacked, changeTitle, changeEdit }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const [todo, setTodo] = useState([]);
  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    getTodos();
  }, [])

  useEffect(() => {
    if (tabs === 0) {
      setTodo(todoList)
    } else if (tabs === 1) {
      setTodo(todoList.filter(list => !list.checked))
    } else if (tabs === 2) {
      setTodo(todoList.filter(list => list.checked))
    }
  }, [tabs, todoList])

  const handleAddTodos = () => {
    if (!value.trim()) {
      return;
    }

    addTodos(value);
    setValue('');
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodos();
    }
  }

  const edit = (id) => {
    changeEdit(id, true)
  }

  const cancel = (id) => {
    changeEdit(id, false)
  }

  const save = (id) => {
    changeEdit(id, false)
    const changeTodo = todo.filter(list => list._id === id);

    if (!changeTodo[0].title.trim()) {
      return;
    }

    changeTitle(id, changeTodo[0].title)
  }

  const onChangeEditInput = (e, id) => {
    e.persist();

    setTodo(prevState => prevState.map(todo => {
      if (todo._id === id) {
        todo.title = e.target.value
      }

      return todo
    }))
  }

  const handleKeyPressEdit = (e, id) => {
    if (e.key === "Enter") {
      save(id)
    }
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper} elevation={3}>
        <h1 className={classes.title}>Что нужно сделать?</h1>
        <Grid style={{ width: '100%', display: 'flex', aligntItems: 'flex-end', margin: 'auto' }} container xs={12} spacing={3}>
          <Grid item xs={12} sm={9}>
            <TextField onKeyPress={handleKeyPress} value={value} onChange={(e) => setValue(e.target.value)} className={classes.input} id="standard-basic" label="Добавить в список" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button onClick={handleAddTodos} style={{ width: '100%', marginTop: '12px' }} variant="outlined" color="primary">Добавить</Button>
          </Grid>
        </Grid>
        <Tabs
          value={tabs}
          onChange={(e, value) => setTabs(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{
            marginTop: 10,
            marginBottom: 5
          }}
        >
          <Tab className={classes.tab} label="Все" />
          <Tab className={classes.tab} label="Активыне" />
          <Tab className={classes.tab} label="Сделанные" />
        </Tabs>
        <List>
          {todo.map(list => (
            list.edit ? (
              <ListItem key={list._id} role={undefined} dense button >
                <TextField onKeyPress={(e) => handleKeyPressEdit(e, list._id)} onChange={(e) => onChangeEditInput(e, list._id)} className={classes.editInput} value={list.title} />
                <ListItemSecondaryAction>
                  <Tooltip title="Сохранить">
                    <IconButton onClick={() => save(list._id)} edge="end" aria-label="comments">
                      <RiSave3Line color='#4cb568' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Отменить">
                    <IconButton onClick={() => cancel(list._id)} edge="end" aria-label="comments">
                      <GiCancel color='#e33434' />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
                <ListItem onClick={() => changeChacked(list._id)} key={list._id} role={undefined} dense button >
                  <ListItemIcon style={{ minWidth: 0 }}>
                    <Checkbox
                      edge="start"
                      checked={list.checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={list.title}
                    className={list.checked ? classes.done : classes.default}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Редактировать">
                      <IconButton onClick={() => edit(list._id)} edge="end" aria-label="comments">
                        <BsPencil />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton onClick={() => deleteTodos(list._id)} edge="end" aria-label="comments">
                        <MdDelete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              )
          ))}
        </List>
      </Paper>
    </main >
  )
}

export default TodoList