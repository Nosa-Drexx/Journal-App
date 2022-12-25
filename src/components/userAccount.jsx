import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { sideAnimation } from "../animations/popupbox";
import { apiURL } from "../store/actions";
import { todolistSlice } from "../store/todolistSlice";

function UserAccount() {
  const [sideBar, setSideBar] = useState(false);
  const dispatch = useDispatch();
  const [logoutState, setLogoutState] = useState(false);
  const sidemodal = useRef(null);
  const pictureBorder = useRef();
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const src = useRef(null);
  const profileImage = useSelector((state) => state.todos.profileImage);
  const actionCenter = useRef(null);
  const closeActionCenter = useRef(null);

  useEffect(() => {
    if (currentUser.profileImage && profileImage) {
      src.current.src = profileImage;
    }
    if (currentUser.profileImage && src && !profileImage) {
      getImage(src);
    }
  }, [currentUser]);

  const getImage = async (src) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).jwt
        : "Bearer unauthorized";
      const dataOBJ = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };
      const result = await fetch(`${apiURL}/update/userProfileImage`, dataOBJ);
      const answer = await result.blob();
      dispatch(todolistSlice.actions.profileImage(URL.createObjectURL(answer)));
      if (src.current) {
        src.current.src = URL.createObjectURL(answer);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (sidemodal) {
      sideAnimation(sidemodal.current);
    }
    if (!sideBar) {
      pictureBorder.current.style.border = "2px solid rgb(12, 213, 12)";
    } else {
      pictureBorder.current.style.border = "2px solid red";
    }
  }, [sideBar]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(todolistSlice.actions.logout(false));
    setLogoutState(true);
  };

  return (
    <>
      {logoutState ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div ref={pictureBorder} className="picture-container">
            <button
              onClick={() => setSideBar((prev) => !prev)}
              className="picture"
            >
              {currentUser.profileImage ? (
                <img ref={src} src="" alt="Profile" />
              ) : (
                currentUser.firstname &&
                `${currentUser.firstname[0].toUpperCase()} ${currentUser.lastname[0].toUpperCase()}`
              )}
            </button>
          </div>
          {sideBar && (
            <div ref={sidemodal} className="user-details">
              <div ref={closeActionCenter} className="btn-container">
                <button className="close" onClick={() => setSideBar(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div ref={actionCenter} className="update-details">
                <div>
                  <button>
                    <Link to={`/dashBoard/${currentUser.username}/myAccount`}>
                      My Account
                    </Link>
                  </button>
                  <div></div>
                </div>
                <div>
                  <button>
                    <Link to={`/dashBoard/${currentUser.username}/settings`}>
                      Settings
                    </Link>
                  </button>
                  <div></div>
                </div>
                <div>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default UserAccount;
