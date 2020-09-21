import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as type from '../store/constants/music'
import * as actions from '../store/actions/music'
import Music from '../page/Music'
import { setHeader } from '../store/actions/header'

const MusicContainer = ({ setHeader, getSearchMusic, searchVideo, addMusic, video, getMusic, deleteVideo }) => {
  useEffect(() => {
    setHeader('Музыка')
  }, [])

  return (
    <Music
     getSearchMusic={getSearchMusic} 
     searchVideo={searchVideo} 
     addMusic={addMusic} 
     video={video}
     getMusic={getMusic}
     deleteVideo={deleteVideo}
     />
  )
}

const mapStateToProps = state => ({
  searchVideo: state.music.searchVideo,
  video: state.music.video
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  getSearchMusic: search => dispatch({ type: type.GET_SEARCH_MUSIC, search }),
  addMusic: (id, title) => dispatch({type: type.ADD_MUSIC, id, title}),
  getMusic: () => dispatch({type: type.GET_VIDEO}),
  deleteVideo: id => dispatch({type: type.DELETE_VIDEO, id}) 
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicContainer)