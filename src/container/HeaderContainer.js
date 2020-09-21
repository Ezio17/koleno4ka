import React from 'react'
import { connect } from 'react-redux'
import { isOpen } from '../store/actions/sideMenu'
import * as gamesConst from '../store/constants/games'

import Header from '../page/Header'

const HeaderContainer = ({ isOpen, setIsOpen, title, isMobile }) => {

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen} title={title} isMobile={isMobile} />
  )
}

const mapStateToProps = state => ({
  isOpen: state.sideMenu.isOpen,
  title: state.header.title,
  isMobile: state.sideMenu.isMobile
})

const mapDispatchToProps = dispatch => ({
  setIsOpen: () => dispatch(isOpen()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)