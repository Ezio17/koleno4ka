import * as type from '../constants/header'

const initialValues = {
  title: 'Главная'
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case type.SET_TITLE: {
      return {
        ...state,
        title: action.title
      }
    }

    default: {
      return state
    }
  }
}