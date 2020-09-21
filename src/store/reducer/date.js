import * as type from '../constants/date'

const initialValues = {
  date: []
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case type.SET_DATE: {
      return {
        ...state,
        date: action.date
      }
    }

    default: {
      return state
    }
  }
}