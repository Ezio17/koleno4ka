import * as type from '../constants/todoList';

const initialValue = {
  todoList: []
}

export default (state = initialValue, action) => {
  switch (action.type) {
    case type.SET_LIST: {
      return {
        ...state,
        todoList: action.todoList
      }
    }

    default: {
      return state
    }
  }
}