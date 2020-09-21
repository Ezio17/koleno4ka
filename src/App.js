import React from 'react';
import './App.scss';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import SideMenuContainer from './container/SideMenuContainer'
import HeaderContainer from './container/HeaderContainer'
import GameContainer from './container/GameContainer'
import MoviesContainer from './container/MoviesContainer'
import MusicContainer from './container/MusicContainer'
import PhotoContainer from './container/PhotoContainer'
import TvSeriesContainer from './container/TvSeriesContainer'
import WordDateContainer from './container/WordDateContainer'
import LoginContainer from './container/LoginContainer'
import TodoListConatiner from './container/TodoListContainer'

const useStyles = makeStyles((theme) => ({
  boxFirst: {
    width: '300px',
    height: '300px',
    margin: '30px',
    background: theme.palette.primary.main
  },
  boxSecond: {
    width: '300px',
    height: '300px',
    margin: '30px',
    background: theme.palette.secondary.main
  },
  page: {
    display: 'flex',
  },
  main: {
    marginRight: '15px',
    width: 'calc(100% - 67px)!important',
    marginBottom: '10px'
  }
}));

function App({ isMobile, ...props }) {
  const classes = useStyles();

  let marginLeft = '';
  if (isMobile) {
    marginLeft = '65px'
  }

  return (
    props.location.pathname === '/login' ? (
      <Route exact path='/login' component={LoginContainer} />
    ) : <div className={classes.page}>
        <SideMenuContainer />
        <div style={{ paddingLeft: marginLeft, }} className={classes.main}>
          <HeaderContainer />
          <Switch>
            <Route exact path='/games' component={GameContainer} />
            <Route exact path='/' component={MoviesContainer} />
            <Route exact path='/music' component={MusicContainer} />
            <Route exact path='/photo' component={PhotoContainer} />
            <Route exact path='/tv_series' component={TvSeriesContainer} />
            <Route exact path='/words_date' component={WordDateContainer} />
            <Route exact path='/todo_list' component={TodoListConatiner} />
          </Switch>
        </div>
      </div>
  );
}

const mapStateToProps = state => ({
  isMobile: state.sideMenu.isMobile
});

const AppRoute = withRouter(App);

export default connect(mapStateToProps)(AppRoute);
