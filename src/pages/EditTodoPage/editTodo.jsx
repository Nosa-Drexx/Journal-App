import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { todoEdited } from "../../store/actions";
import JournalImage from "../../images/Journal-text.png";

function EditTodo() {
  const location = useLocation(null);
  const { itemToEdit } = location.state;
  const [mutateItem, setMutateItem] = useState(itemToEdit.val);
  const [navigate, setNavigate] = useState(false);
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const dispatch = useDispatch();
  const font = useRef();
  const [sameAsPrevious, setSameAsPrevious] = useState(true);

  useEffect(() => {
    mutateItem === itemToEdit.val
      ? setSameAsPrevious(true)
      : setSameAsPrevious(false);

    if (!mutateItem.length || sameAsPrevious) {
      font.current.style.color = "rgb(109, 104, 104)";
    } else {
      font.current.style.color = "white";
    }
  }, [mutateItem]);

  function submitEdittedContent(e) {
    e.preventDefault();
    dispatch(todoEdited(itemToEdit.uuid, mutateItem));
  }

  return (
    <>
      {navigate && <Navigate to={`/dashBoard/${currentUser.username}`} />}
      <form
        action="edit"
        method="get"
        className="edit-area"
        onSubmit={submitEdittedContent}
      >
        <div>
          <div>
            <button onClick={() => setNavigate(true)} type="button">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={JournalImage} alt="JourNal-logo"></img>
            <button
              disabled={sameAsPrevious || !mutateItem.length ? true : false}
              onClick={() => setNavigate(true)}
              type="submit"
            >
              <i ref={font} className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
        <label>
          <textarea
            placeholder="Type a text"
            value={mutateItem}
            onChange={(e) => setMutateItem(e.target.value)}
            //eslint-disable-next-line
            autoFocus
          />
        </label>
      </form>
    </>
  );
}
export default EditTodo;
