import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todolistSlice, updateAPIAsyncThunk } from "../store/todolistSlice";
import Modal from "./modal";

function RemoveAllCompleted() {
  const dispatch = useDispatch();
  const dataToUpdate = useSelector((state) => state.todos.updateApiWith);
  const [destroyTodo, setDestroyTodo] = useState(false);
  const text = `Are you sure you want to delete all checked?`;

  useEffect(() => {
    if (dataToUpdate) {
      dispatch(updateAPIAsyncThunk(dataToUpdate));
      dispatch(todolistSlice.actions.resetupdateAPIWith(false));
    }
  }, [dataToUpdate]);

  function removeMany() {
    return () => {
      dispatch(todolistSlice.actions.removeAllCompleted());
    };
  }
  return (
    <div className="remove-many">
      {destroyTodo && (
        <Modal
          text={text}
          completeAction={removeMany()}
          terminateAction={setDestroyTodo}
        />
      )}
      <button className="remove-many-btn" onClick={() => setDestroyTodo(true)}>
        Remove All Marked
      </button>
    </div>
  );
}

export default RemoveAllCompleted;
