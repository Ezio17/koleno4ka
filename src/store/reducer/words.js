import * as type from '../constants/words';

const initialValues = {
  words: [],
}

export default (state = initialValues, action) => {
  switch(action.type) {
    case type.SET_WORDS: {
      return {
        ...state,
        words: action.words
      }
    }

    default: {
      return state
    }
  }
}