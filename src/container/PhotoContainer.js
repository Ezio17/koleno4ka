import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Photo from '../page/Photo'
import { setHeader } from '../store/actions/header'
import * as type from '../store/constants/photo'

const PhotoContainer = ({ setHeader, photo, getPhoto, addPhoto, deletePhoto }) => {
  useEffect(() => {
    setHeader('Фоточки')
  }, [])

  return (
    <Photo
      photo={photo}
      getPhoto={getPhoto}
      addPhoto={addPhoto}
      deletePhoto={deletePhoto}
    />
  )
}

const mapStateToProps = state => ({
  photo: state.photo.photo
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  getPhoto: () => dispatch({ type: type.GET_PHOTO }),
  addPhoto: (img, category) => dispatch({ type: type.ADD_PHOTO, img, category }),
  deletePhoto: id => dispatch({ type: type.DELETE_PHOTO, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer)