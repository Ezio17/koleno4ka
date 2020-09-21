import * as type from '../constants/music'

const initialValues = {
  searchVideo: [],
  video: []
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case type.SET_SEARCH_MUSIC: {
      return {
        ...state,
        searchVideo: action.searchVideo
      }
    }

    case type.SET_VIDEO: {
      return {
        ...state,
        video: action.video
      }
    }

    default: {
      return state
    }
  }
}