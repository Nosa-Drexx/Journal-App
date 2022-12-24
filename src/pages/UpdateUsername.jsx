import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";
import { todolistSlice } from "../store/todolistSlice";

function UpdateUsername() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [username, setUsername] = useState("");
  const [reqResult, setReqResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);

  useEffect(() => {
    if (good.current) {
      setTimeout(() => {
        setNavigate(true);
      }, 2000);
    }
  });

  useEffect(() => {
    if (reqResult.message) {
      localStorage.setItem(
        "token",
        JSON.stringify({ jwt: `Bearer ${reqResult.token}` })
      );
      dispatch(
        todolistSlice.actions.updateUsername({ username: reqResult.username })
      );
    }
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setReqResult({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqResult]);

  async function handleSubmit(username) {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).jwt
        : "Bearer unauthorized";

      const dataOBJ = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ username }),
      };
      setLoading(true);
      const result = await fetch(`${apiURL}/update/username`, dataOBJ);
      const answer = await result.json();
      setLoading(false);
      setReqResult({ ...answer });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setReqResult({ error: "500! Server Error" });
    }
  }

  return (
    <>
      {!currentUser.logIn ? (
        <Navigate to="/" />
      ) : (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {navigate && (
                <Navigate to={`/dashBoard/${currentUser.username}/myAccount`} />
              )}
              {reqResult.error && (
                <div ref={animatebox} className="pop-out">
                  {reqResult.error}{" "}
                  <div ref={bad} className="bad">
                    .
                  </div>
                </div>
              )}
              {reqResult.message && (
                <div ref={animatebox} className="pop-out">
                  {reqResult.message}{" "}
                  <div ref={good} className="good">
                    .
                  </div>
                </div>
              )}
              <div className="verify update-user-info">
                <div className="update-back">
                  <div className="back">
                    <button>
                      <Link to={`/dashBoard/${currentUser.username}/myAccount`}>
                        <i className="fa-solid fa-arrow-left"></i>
                      </Link>
                    </button>
                  </div>
                </div>
                <form
                  className="verify-form"
                  onSubmit={() => handleSubmit(username)}
                >
                  <input
                    className="verify-input"
                    type="text"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <input className="verify-btn" type="submit" value="Update" />
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default UpdateUsername;
