import React from 'react'
import { connect } from 'react-redux'

import Login from '../page/Login'
import * as type from '../store/constants/user'
import * as action from '../store/actions/user'

const LoginContainer = ({ error, user, login, setUser }) => {
  return (
    <Login
      error={error}
      user={user}
      login={login}
      setUser={setUser}
    />
  )
}

const mapStateToProps = state => ({
  error: state.user.error,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  login: (name, password) => dispatch({ type: type.LOGIN, name, password }),
  setUser: (name) => dispatch(action.setUser(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)