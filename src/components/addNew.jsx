import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AddNew() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  return (
    <div className="add-new-container">
      <Link to={`/dashBoard/${currentUser.username}/add`}>
        <i className="fa-solid fa-plus"></i>
      </Link>
    </div>
  );
}

export default AddNew;
