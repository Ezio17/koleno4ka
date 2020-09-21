import * as type from '../constants/user.js'

const initialValues = {
  error: '',
  user: '',
  token: '',
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case type.SET_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }

    case type.SET_USER: {
      return {
        ...state,
        user: action.user.user,
        token: action.user.token
      }
    }

    default: {
      return state
    }
  }
}