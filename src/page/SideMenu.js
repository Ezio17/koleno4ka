import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from '../assets/img/icon.png'
import { BsFillHouseFill } from "react-icons/bs";
import { IoIosImages, IoMdExit } from "react-icons/io";
import { GiFilmSpool, GiFilmStrip, GiGamepad, GiTalk } from "react-icons/gi";
import { MdLibraryMusic } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { Redirect } from "react-router";
import { NavLink } from 'react-router-dom';

import { widthSideMenu } from '../general'
import BgSide from '../assets/img/bg_side.jpg'

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    background: theme.palette.primary.main,
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    color: '#fff',
    background: 'rgba(0,0,0,.8)',
    padding: '10px 12px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '1.5s',
    textOverflow: 'hidden',

    '&::scrollbar-thumb': {
      backgroundRadius: "2px",
      backgroundColor: 'rgba(0,0,0,0.5)',
      boxShadow: '0 0 1px rgba(255,255,255,0.5)'
    }
  },
  wrapperLogo: {
    padding: '15px 0',
    borderBottom: '2px solid #494d51',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '100%'
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    fontFamily: 'Love, Roboto, Arial, serif',
    fontSize: '30px',
    overflow: 'hidden',
  },
  list: {
    width: '100%',
  },
  text: {
    fontSize: '44px'
  },
  icon: {
    color: '#d4d4d5',
    transition: '1.5s',
  },
  listItem: {
    marginBottom: '5px',
    overflow: 'hidden',
    transition: '1.5s',
    fontSize: '22px',
    fontFamily: 'Alice,  serif',
  },
  hoverList: {
    background: 'red'
  },
  arrow: {
    marginLeft: '10px'
  },
  activeList: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',

    '& svg': {
      color: theme.palette.primary.main
    }
  },
  blackWrapper: {
    minHeight: '100vh',
    backgroundImage: `url(${BgSide})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    top: 0,
    left: 0,
    zIndex: '-3',
    position: 'sticky',
    transition: '1.5s',
    marginRight: '15px'
  },
  title: {
    '& span': {
      width: '96px'
    }
  }
}));

const SideMenu = ({ isOpen, isMobile, setIsMobile, setIsOpen, closeSideMenu, user, token, setUser, ...props }) => {
  const classes = useStyles();
  const [position, setPosition] = useState({})

  const marginIcon = isOpen ? '' : '-11px';

  function updateWindowDimensions() {
    if (window.innerWidth <= 600) {
      setIsMobile();
      closeSideMenu();
      setPosition({
        position: "absolute",
        zIndex: 1,
      });
    }
  }

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
  }, []);

  const sideImagePosition = isMobile ? 'fixed' : 'sticky';

  const userToken = JSON.parse(localStorage.getItem('token'));
  const userName = JSON.parse(localStorage.getItem('user'));

  if (userToken) {
    setUser(JSON.parse(localStorage.getItem('user')), JSON.parse(localStorage.getItem('token')))
  } else if (!userToken && !user) {
    return <Redirect to='/login' />
  }

  return (
    <div style={position}>
      <div style={{ width: widthSideMenu(isOpen), position: sideImagePosition }} className={classes.blackWrapper}></div>
      <div
        className={classes.sideMenu}
        style={{ width: widthSideMenu(isOpen) }}
      >
        <div className={classes.wrapperLogo}>
          {isOpen ? <p className={classes.logoText}>KOLENO4KA</p> : <img className={classes.logo} src={Logo} alt='logo' />}
        </div>
        <List
          component="nav"
          className={classes.list}
        >
          <ListItem exact to='/' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <GiFilmSpool style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Фильмы" />
          </ListItem>
          <ListItem to='/tv_series' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <GiFilmStrip style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Сериалы" />
          </ListItem>
          <ListItem to='/photo' activeClassName={classes.activeList} component={NavLink} className={classes.listItem} button>
            <ListItemIcon>
              <IoIosImages style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Фоточки" />
          </ListItem>
          <ListItem to='/games' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <GiGamepad style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Игры" />
          </ListItem>
          <ListItem to='/music' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <MdLibraryMusic style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Музыка" />
          </ListItem>
          <ListItem to='/words_date' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <GiTalk style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} className={classes.title} primary="Слова/Даты" />
          </ListItem>
          <ListItem to='/todo_list' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <FaClipboardList style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} className={classes.title} primary="Планы" />
          </ListItem>
          <ListItem to='/login' activeClassName={classes.activeList} className={classes.listItem} button component={NavLink}>
            <ListItemIcon>
              <IoMdExit style={{ marginLeft: marginIcon }} className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text} className={classes.title} primary="Выйти" />
          </ListItem>
        </List>
      </div >
    </div>
  )
}

export default SideMenu