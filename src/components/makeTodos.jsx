import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeTodo, todoDone } from "../store/actions";
import { todolistSlice, updateAPIAsyncThunk } from "../store/todolistSlice";
// import EditTodo from "../pages/editTodo";
import Modal from "./modal";

function MakeTodos() {
  const todoList = useSelector((state) => state.todos.searchState);
  const dispatch = useDispatch();
  const dataToUpdate = useSelector((state) => state.todos.updateApiWith);
  const [destroyTodo, setDestroyTodo] = useState(false);
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const text = `Are you sure you want to delete this?`;

  useEffect(() => {
    if (dataToUpdate) {
      dispatch(updateAPIAsyncThunk(dataToUpdate));
      dispatch(todolistSlice.actions.resetupdateAPIWith(false));
    }
  }, [dataToUpdate]); //eslint-disable-line

  function removeCurrentTodo(e) {
    return () => {
      const elemId = e.target.getAttribute("data-id");
      dispatch(removeTodo(elemId));
    };
  }

  function doneCurrentTodo(e) {
    const elemId = e.target.getAttribute("data-id");
    dispatch(todoDone(elemId));
  }

  return (
    <>
      {destroyTodo && (
        <Modal
          text={text}
          completeAction={removeCurrentTodo(destroyTodo)}
          terminateAction={setDestroyTodo}
        />
      )}
      <section className="todo-center">
        {todoList.map((lists, index) => {
          return (
            <div className="text-container" key={index}>
              <p className="date">{lists.date}</p>
              <div className="text">
                {lists.completed ? <del>{lists.todo}</del> : lists.todo}
              </div>
              <input
                data-id={lists.id}
                type="checkbox"
                onChange={doneCurrentTodo}
                checked={lists.completed}
              />
              <button>
                <Link
                  to={`/dashBoard/${currentUser.username}/edit`}
                  state={{
                    itemToEdit: { uuid: lists.id, val: lists.todo },
                  }}
                >
                  Edit
                </Link>
              </button>
              <button data-id={lists.id} onClick={(e) => setDestroyTodo(e)}>
                Remove Me
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}
export default MakeTodos;
