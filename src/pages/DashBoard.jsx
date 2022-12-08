import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MakeTodos from "../components/makeTodos";
import SearchBar from "../components/searchTodo";
import NewTodo from "../components/todoToMake";
import { todolistSlice } from "../store/todolistSlice";
import { useState, useRef, useEffect } from "react";
import animation from "../animations/popupbox";

function DashBoard() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo.logIn);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.todos.error);
  const [errorMin, setErrorMin] = useState(false);
  const animatebox = useRef();
  const bad = useRef();

  useEffect(() => {
    dispatch(todolistSlice.actions.error(false));
  }, []);

  useEffect(() => {
    if (error.error) {
      setErrorMin(true);
    }
  }, [error]);

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current);

      const timer = setTimeout(() => {
        setErrorMin(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMin]);

  return (
    <>
      {!currentUser ? (
        <Navigate to="/" />
      ) : (
        <>
          {errorMin && (
            <div ref={animatebox} className="pop-out">
              {error.error}{" "}
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          <NewTodo />
          <SearchBar />
          <MakeTodos />
        </>
      )}
    </>
  );
}

export default DashBoard;
