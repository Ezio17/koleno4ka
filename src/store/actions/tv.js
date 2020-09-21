import * as type from '../constants/tv';

export const setSearchTv = (searchTv) => ({
  type: type.SET_SEARCH_TV,
  searchTv
})

export const setTv = (tv) => ({
  type: type.SET_TV,
  tv
})

export const setTvInfo= tvInfo => ({
  type: type.SET_TV_INFO,
  tvInfo
})