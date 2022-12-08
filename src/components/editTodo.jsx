function EditTodo({ submitEdittedContent, contentToEdit, setContentToEdit }) {
  return (
    <>
      <div className="modal"></div>
      <form
        action="edit"
        method="get"
        className="edit-area"
        onSubmit={submitEdittedContent}
      >
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
    </>
  );
}
export default EditTodo;
