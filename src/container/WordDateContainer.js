import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import WordDate from '../page/WordDate'
import { setHeader } from '../store/actions/header'
import * as wordsType from '../store/constants/words'
import * as dateType from '../store/constants/date'

const WordContainer = ({ setHeader, getWords, addWords, deleteWords, words, date, getDate, addDate, deleteDate }) => {
  useEffect(() => {
    setHeader('Слова/Даты')
  }, [])

  return (
    <WordDate
      getWords={getWords}
      addWords={addWords}
      deleteWords={deleteWords}
      words={words}
      date={date}
      getDate={getDate}
      addDate={addDate}
      deleteDate={deleteDate}
    />
  )
}

const mapStateToProps = state => ({
  words: state.words.words,
  date: state.date.date
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  getWords: () => dispatch({ type: wordsType.GET_WORDS }),
  addWords: (title, author) => dispatch({ type: wordsType.ADD_WORDS, title, author }),
  deleteWords: (id) => dispatch({ type: wordsType.DELETE_WORDS, id }),

  getDate: () => dispatch({ type: dateType.GET_DATE }),
  addDate: (title, date) => dispatch({ type: dateType.ADD_DATE, title, date }),
  deleteDate: (id) => dispatch({ type: dateType.DELETE_DATE, id }),
})

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer)