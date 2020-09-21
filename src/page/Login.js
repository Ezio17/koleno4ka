import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import meBg from '../assets/img/me.jpg';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bgBlack: {
    backgroundImage: `url(${meBg})`,
    width: '100vw',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    color: '#fff',
    position: 'absolute',
  },
  main: {
    height: '100vh',
    width: '100vw',
    background: 'rgba(0,0,0,.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
    padding: '10px',
    boxSizing: 'border-box'
  },
  formWrapper: {
    width: '400px',
    background: '#fff',
    borderRadius: '15px',
    padding: '10px'
  },
  title: {
    textAlign: 'center',
    fontSize: '45px',
    marginTop: '10px',
    color: theme.palette.secondary.main,
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    marginBottom: '30px'
  },
  button: {
    width: '100%',
    fontSize: '20px',
    marginBottom: '25px'
  },
  alert: {
    marginBottom: '15px'
  }
}));

const Login = ({ error, user, login, setUser, ...props }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    password: ''
  });
  const [logined, setLogined] = useState(false);

  useEffect(() => {
    setUser('', '');
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }, [])

  const handleChange = e => {
    e.persist();

    setValues(prevValues => (
      {
        ...prevValues,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleOnSubmit = e => {
    e.preventDefault();

    login(values.name, values.password);
    setLogined(true);
  }

  console.log(user)

  if (user && logined) {
    props.history.push('/')
  }

  return (
    <>
      <div className={classes.bgBlack} />
      <main className={classes.main}>
        <div className={classes.formWrapper}>
          <h3 className={classes.title}>Логин</h3>
          <form onSubmit={handleOnSubmit}>
            <TextField
              label={'Имя'}
              className={classes.input}
              variant="outlined"
              value={values.name}
              name='name'
              onChange={handleChange}
            />
            <TextField
              label={'Пароль'}
              className={classes.input}
              variant="outlined"
              type='password'
              value={values.password}
              name='password'
              onChange={handleChange}
            />
            {error && (
              <MuiAlert className={classes.alert} elevation={6} variant="filled" severity="error">{error}</MuiAlert>
            )}
            <Button type='submit' className={classes.button} variant="contained" color="primary">
              Войти &#129316;
           </Button>
          </form>
        </div>
      </main>
    </>
  )
}

export default withRouter(Login);