import * as type from '../constants/words'

export const setWords = words => ({
  type: type.SET_WORDS,
  words
})