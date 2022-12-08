import { createAction, nanoid } from "@reduxjs/toolkit";

function avoidDuplicateTodos(todo, todoList) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].todo.toLowerCase() === todo.toLowerCase()) {
      return { todo, ...todoList[i] };
    }
  }
  return { todo, id: nanoid(), completed: false };
}

export const dataReceived = createAction(
  "todos/receivedDataFromAPI",
  (data) => {
    return { payload: data };
  }
);
export const addTodo = createAction("todos/add", (todo, todoList) => ({
  payload: avoidDuplicateTodos(todo, todoList),
}));
export const removeTodo = createAction("todos/remove", (uuid) => ({
  payload: { id: uuid },
}));
export const todoEdited = createAction("todos/edit", (uuid, todo) => ({
  payload: { todo, id: uuid },
}));
export const todoDone = createAction("todos/done", (uuid) => ({
  payload: { id: uuid },
}));
export const searchFor = createAction("todos/search", (arr) => ({
  payload: arr,
}));
