import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, todoDone, todoEdited } from "../store/actions";
import { todolistSlice, updateAPIAsyncThunk } from "../store/todolistSlice";
import EditTodo from "./editTodo";

function MakeTodos() {
  const todoList = useSelector((state) => state.todos.searchState);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [contentToEdit, setContentToEdit] = useState({ uuid: "", val: "" });
  const dataToUpdate = useSelector((state) => state.todos.updateApiWith);

  useEffect(() => {
    console.log(dataToUpdate);
    if (dataToUpdate) {
      dispatch(updateAPIAsyncThunk(dataToUpdate));
      dispatch(todolistSlice.actions.resetupdateAPIWith(false));
    }
  }, [dataToUpdate]);

  function removeCurrentTodo(e) {
    const elemId = e.target.getAttribute("data-id");
    dispatch(removeTodo(elemId));
  }

  function doneCurrentTodo(e) {
    const elemId = e.target.getAttribute("data-id");
    dispatch(todoDone(elemId));
  }

  function editContent(content) {
    setEdit(true);
    setContentToEdit(content);
  }

  function submitEdittedContent(e) {
    e.preventDefault();
    dispatch(todoEdited(contentToEdit.uuid, contentToEdit.val));
    setEdit(false);
  }

  return (
    <section className="todo-center">
      {todoList.map((lists, index) => {
        return (
          <div key={index}>
            <h3>{lists.completed ? <del>{lists.todo}</del> : lists.todo}</h3>
            <input
              data-id={lists.id}
              type="checkbox"
              onChange={doneCurrentTodo}
              checked={lists.completed}
            />
            <button
              onClick={() => editContent({ uuid: lists.id, val: lists.todo })}
            >
              Edit
            </button>
            <button data-id={lists.id} onClick={removeCurrentTodo}>
              Remove Me
            </button>
          </div>
        );
      })}
      {edit && (
        <EditTodo
          submitEdittedContent={submitEdittedContent}
          contentToEdit={contentToEdit}
          setContentToEdit={setContentToEdit}
        />
      )}
    </section>
  );
}
export default MakeTodos;
