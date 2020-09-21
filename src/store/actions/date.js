import * as type from '../constants/date';

export const setDate = date => ({
  type: type.SET_DATE,
  date,
})