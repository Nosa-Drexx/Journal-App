import { useRef } from "react";
import { useEffect } from "react";

function EditTodo({
  submitEdittedContent,
  contentToEdit,
  setContentToEdit,
  setEdit,
}) {
  const modal = useRef(null);

  //disables scroll on page when modal is open(when components first mount) and enables page scroll when modal is closed (when component is about to unmount)
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);
  useEffect(() => {
    if (modal.current) {
      modal.current.style.top = `${0 + window.scrollY}px`;
    }
  }, [modal]);
  return (
    <>
      <div ref={modal} className="modal">
        <form
          action="edit"
          method="get"
          className="edit-area"
          onSubmit={submitEdittedContent}
        >
          <button type="button" onClick={() => setEdit(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <textarea
            value={contentToEdit.val}
            onChange={(event) =>
              setContentToEdit((prev) => ({
                ...prev,
                val: event.target.value,
              }))
            }
          />
          <br />
          <input type="submit" value="Edit" />
        </form>
      </div>
    </>
  );
}
export default EditTodo;
