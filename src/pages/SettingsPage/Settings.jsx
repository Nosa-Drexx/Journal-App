import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LightDarkMode from "../../components/lightDarkMode";

function Settings() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  return (
    <>
      <div className="settings">
        <div className="back">
          <button>
            <Link to={`/dashBoard/${currentUser.username}`}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </button>
        </div>
        <LightDarkMode />
      </div>
    </>
  );
}

export default Settings;
