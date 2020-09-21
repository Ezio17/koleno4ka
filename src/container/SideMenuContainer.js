import React from 'react'
import { connect } from 'react-redux'

import SideMenu from '../page/SideMenu'
import * as action from '../store/actions/sideMenu'
import * as actionUser from '../store/actions/user';

const SideMenuContainer = ({ isOpen, isMobile, setIsMobile, setIsOpen, closeSideMenu, user, token, setUser }) => {
  return (
    <SideMenu
      isOpen={isOpen}
      isMobile={isMobile}
      setIsMobile={setIsMobile}
      setIsOpen={setIsOpen}
      closeSideMenu={closeSideMenu}
      user={user}
      token={token}
      setUser={setUser}
    />
  )
}

const mapStateToProps = state => {
  return ({
    isOpen: state.sideMenu.isOpen,
    isMobile: state.sideMenu.isMobile,
    user: state.user.user,
    token: state.user.token
  })
}

const mapDispatchToProps = dispatch => ({
  setIsMobile: () => dispatch(action.isMobile()),
  setIsOpen: () => dispatch(action.isOpen()),
  closeSideMenu: () => dispatch(action.closeSideMenu()),
  setUser: (user, token) => dispatch(actionUser.setUser(user, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer)