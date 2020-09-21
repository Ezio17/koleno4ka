import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import TvSeries from '../page/TvSeries'
import { setHeader } from '../store/actions/header'
import * as type from '../store/constants/tv'

const TvSeriesContainer = ({ setHeader, searchTv, tv, setSearchTv, getTv, addTv, deleteTv, getTvInfo, addRating, addDate, tvInfo, changeEvent }) => {
  useEffect(() => {
    setHeader('Сериалы')
  }, [])

  return (
    <TvSeries
      searchTv={searchTv}
      tv={tv}
      setSearchTv={setSearchTv}
      getTv={getTv}
      addTv={addTv}
      deleteTv={deleteTv}
      getTvInfo={getTvInfo}
      tvInfo={tvInfo}
      addDate={addDate}
      changeEvent={changeEvent}
      addRating={addRating}
    />
  )
}

const mapStateToProps = state => ({
  searchTv: state.tv.searchTv,
  tv: state.tv.tv,
  tvInfo: state.tv.tvInfo
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  setSearchTv: search => dispatch({ type: type.SEARCH_TV, search }),
  getTv: () => dispatch({ type: type.GET_TV }),
  addTv: (id, title, image, event) => dispatch({ type: type.ADD_TV, id, title, image, event }),
  deleteTv: (id) => dispatch({ type: type.DELETE_TV, id }),
  getTvInfo: id => dispatch({ type: type.GET_TV_INFO, id }),
  changeEvent: id => dispatch({ type: type.CHANGE_EVENT, id }),
  addDate: (date, id) => dispatch({ type: type.ADD_DATE_TV, date, id }),
  addRating: (rating, name, id) => dispatch({ type: type.ADD_RATING_TV, rating, name, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(TvSeriesContainer)