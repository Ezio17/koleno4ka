import * as type from '../constants/photo'

export const setPhoto = photo => ({
  type: type.SET_PHOTO,
  photo
})