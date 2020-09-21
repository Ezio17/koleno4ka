import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import TodoList from '../page/TodoList';
import { setHeader } from '../store/actions/header'
import * as type from '../store/constants/todoList'

const TodoListContainer = ({ setHeader, todoList, getTodos, addTodos, deleteTodos, changeChacked, changeTitle, changeEdit }) => {
  useEffect(() => {
    setHeader('Что нужно сделать :)')
  }, [])

  console.log(todoList)

  return (
    <TodoList
      todoList={todoList}
      getTodos={getTodos}
      addTodos={addTodos}
      deleteTodos={deleteTodos}
      changeChacked={changeChacked}
      changeTitle={changeTitle}
      changeEdit={changeEdit}
    />
  )
}

const mapStateToProps = state => ({
  todoList: state.todoList.todoList
})

const mapDispatchToProps = dispatch => ({
  setHeader: title => dispatch(setHeader(title)),
  getTodos: () => dispatch({ type: type.GET_LIST }),
  addTodos: title => dispatch({ type: type.ADD_LIST, title }),
  deleteTodos: id => dispatch({ type: type.DELETE_LIST, id }),
  changeChacked: id => dispatch({ type: type.CHANGE_CHEKCED, id }),
  changeTitle: (id, title) => dispatch({ type: type.CHANGE_TITLE, id, title }),
  changeEdit: (id, edit) => dispatch({type: type.CHANGE_EDIT, id, edit})
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer)