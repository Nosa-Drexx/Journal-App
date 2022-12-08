import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/actions";
import { _STORAGE } from "../store/todolistSlice";

function NewTodo() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.AllState);

  useEffect(() => {
    //keeps localStorage up to date
    const restLocalStorage = JSON.stringify(todoList);
    localStorage.setItem(_STORAGE, restLocalStorage);
  }, [todoList]);

  async function createNewTodo(e) {
    e.preventDefault();
    dispatch(addTodo(state, todoList));
  }
  return (
    <form className="create-todos" onSubmit={createNewTodo}>
      <label htmlFor="todo">
        <input
          id="todo"
          name="todo"
          type="text"
          className="todo"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <input type="submit" value="Add To List" />
    </form>
  );
}
export default NewTodo;
