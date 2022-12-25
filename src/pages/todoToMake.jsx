import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addTodo } from "../store/actions";
import JournalImage from "../images/Journal-text.png";

function NewTodo() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.AllState);
  const [navigate, setNavigate] = useState(false);
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const font = useRef();

  useEffect(() => {
    if (!state.length) {
      font.current.style.color = "rgb(109, 104, 104)";
    } else {
      font.current.style.color = "white";
    }
  }, [state]);

  async function createNewTodo(e) {
    e.preventDefault();
    dispatch(addTodo(state, todoList));
  }
  return (
    <>
      {navigate && <Navigate to={`/dashBoard/${currentUser.username}`} />}
      <form className="create-todos" onSubmit={createNewTodo}>
        <div>
          <div>
            <button onClick={() => setNavigate(true)} type="button">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={JournalImage} alt="JourNal-logo"></img>
            <button
              disabled={state.length ? false : true}
              onClick={() => setNavigate(true)}
              type="submit"
            >
              <i ref={font} className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>

        <label htmlFor="todo">
          <textarea
            id="todo"
            name="todo"
            type="text"
            className="todo"
            placeholder="Type text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            //eslint-disable-next-line
            autoFocus
            required
          />
        </label>
      </form>
    </>
  );
}
export default NewTodo;
