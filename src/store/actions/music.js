import * as type from '../constants/music';

export const setSearchVideo = (searchVideo) => ({
  type: type.SET_SEARCH_MUSIC,
  searchVideo
})

export const setVideo = (video) => ({
  type: type.SET_VIDEO,
  video
})