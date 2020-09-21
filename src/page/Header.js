import React, { useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { MdDashboard } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  wrapperIcon: {
    width: 35,
    height: 35,
    borderRadius: '50%',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '15px',
    padding: '7px',

    '&:hover': {
      background: 'white'
    }
  },
  icon: {
    color: 'rgb(153, 153, 153)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    marginBottom: '20px',
    transition: '1.5s',
  },
  title: {
    marginLeft: '20px',
    color: 'rgb(85, 85, 85)',
    fontSize: '20px',
    marginTop: '32px',
    fontWeight: 700,
    overflowX: 'hidden'
  }
}));

const Header = ({ isOpen, setIsOpen, title, isMobile }) => {
  const classes = useStyles();

  const marginLeft = isMobile && isOpen ? '150px' : '';

  return (
    <header style={{ marginLeft }} className={classes.header}>
      <IconButton onClick={setIsOpen} className={classes.wrapperIcon}>
        {isOpen ? <BsThreeDotsVertical className={classes.icon} /> : <MdDashboard className={classes.icon} />}
      </IconButton >
      <p className={classes.title}>{title}</p>
    </header>
  )
}

export default Header