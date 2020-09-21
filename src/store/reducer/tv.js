import * as type from '../constants/tv';

const initialValue = {
  tv: [],
  searchTv: [],
  tvInfo: {}
}

export default (state = initialValue, action) => {
  switch (action.type) {
    case type.SET_SEARCH_TV: {
      return {
        ...state,
        searchTv: action.searchTv
      }
    }

    case type.SET_TV: {
      return {
        ...state,
        tv: action.tv
      }
    }

    case type.SET_TV_INFO: {
      return {
        ...state,
        tvInfo: action.tvInfo
      }
    }

    default: {
      return state
    }
  }
}