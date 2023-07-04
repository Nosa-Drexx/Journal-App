import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../../animations/popupbox";
import LoadingScreen from "../../components/loadingScreen";
import Modal from "../../components/modal";
import { apiURL } from "../../store/actions";
import { todolistSlice } from "../../store/todolistSlice";

function MyAccount() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reqResult, setReqResult] = useState({});
  const animatebox = useRef(null);
  const dispatch = useDispatch();
  const bad = useRef(null);
  const text = "Are you sure you want to Delete your Account";

  useEffect(() => {
    if (reqResult.message) {
      dispatch(todolistSlice.actions.logout(false));
    }
    if (animatebox.current) {
      animation(animatebox.current, bad.current);

      const timer = setTimeout(() => {
        setReqResult({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqResult]);

  async function deleteUser() {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).jwt
        : "Bearer unauthorized";

      const dataOBJ = {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      setLoading(true);
      const result = await fetch(`${apiURL}/update/delete`, dataOBJ);
      const answer = await result.json();
      setLoading(false);
      setReqResult({ ...answer });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setReqResult({ error: "Error Connecting to Server" });
    }
  }
  return (
    <>
      {!currentUser.logIn && <Navigate to="/login" />}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {deleteAccount && (
            <Modal
              text={text}
              completeAction={deleteUser}
              terminateAction={setDeleteAccount}
            />
          )}
          <>
            {reqResult.error && (
              <div ref={animatebox} className="pop-out">
                {reqResult.error}{" "}
                <div ref={bad} className="bad">
                  .
                </div>
              </div>
            )}
            <div className="my-account">
              <div className="back">
                <button>
                  <Link to={`/dashBoard/${currentUser.username}`}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </Link>
                </button>
              </div>
              <div className="updates">
                <button className="lists">
                  <Link
                    to={`/dashBoard/${currentUser.username}/updates/uploadImage`}
                  >
                    Add Profile Photo or Update Profile Photo
                  </Link>
                </button>
              </div>
              <div className="updates">
                <button className="lists">
                  <Link
                    to={`/dashBoard/${currentUser.username}/updates/username`}
                  >
                    Change Username
                  </Link>
                </button>
              </div>
              <div className="updates">
                <button className="lists">
                  <Link
                    to={`/dashBoard/${currentUser.username}/updates/password`}
                  >
                    Change Password
                  </Link>
                </button>
              </div>
              <div className="updates">
                <button className="lists">
                  <Link to={`/dashBoard/${currentUser.username}/updates/email`}>
                    Change Email
                  </Link>
                </button>
              </div>
              <div className="updates delete">
                <button
                  onClick={() => setDeleteAccount(true)}
                  className="lists"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}

export default MyAccount;
