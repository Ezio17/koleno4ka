import * as type from '../constants/todoList';

export const setList = todoList => ({
  type: type.SET_LIST,
  todoList
})