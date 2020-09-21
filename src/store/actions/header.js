import * as type from '../constants/header'

export const setHeader = title => ({
  type: type.SET_TITLE,
  title,
})