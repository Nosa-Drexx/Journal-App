import { useDispatch, useSelector } from "react-redux";
import MakeTodos from "../../components/Make-Todo/makeTodos";
import SearchBar from "../../components/Search-Todo/searchTodo";
// import NewTodo from "./todoToMake";
import { useState, useRef, useEffect } from "react";
import animation from "../../animations/popupbox";
import UserAccount from "../../components/User-Account/userAccount";
import { todolistSlice } from "../../store/todolistSlice";
import RemoveAllCompleted from "../../components/Remove-Task/removeAllCompleted";
import UserWelcome from "../../components/User-Welcome/userWelcome";
import AddNew from "../../components/Add-New/addNew";

function DashBoard() {
  const error = useSelector((state) => state.todos.error);
  const [errorMin, setErrorMin] = useState(false);
  const dispatch = useDispatch();
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);

  useEffect(() => {
    if (error.error) {
      setErrorMin(error.error);
    }
  }, [error]);

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setErrorMin(false);
        dispatch(todolistSlice.actions.error(false));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMin]);

  return (
    <>
      {errorMin && (
        <div ref={animatebox} className="pop-out">
          {errorMin}
          {errorMin === "Updated" ? (
            <div ref={good} className="good">
              .
            </div>
          ) : (
            <div ref={bad} className="bad">
              .
            </div>
          )}
        </div>
      )}
      <UserAccount />
      <UserWelcome />
      <SearchBar />
      <RemoveAllCompleted />
      <MakeTodos />
      <AddNew />
    </>
  );
}

export default DashBoard;
