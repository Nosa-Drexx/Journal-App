import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";

function UpdateEmail() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [email, setEmail] = useState("");
  const [reqResult, setReqResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);

  useEffect(() => {
    if (good.current) {
      setTimeout(() => {
        setNavigate(true);
      }, 3000);
    }
  });

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setReqResult({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqResult]);

  async function handleSubmit(email) {
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
        body: JSON.stringify({ email }),
      };
      setLoading(true);
      const result = await fetch(`${apiURL}/update/email`, dataOBJ);
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
            <form className="verify-form" onSubmit={() => handleSubmit(email)}>
              <input
                className="verify-input"
                type="email"
                placeholder="New Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input className="verify-btn" type="submit" value="Update" />
            </form>
          </div>
        </>
      )}
    </>
  );
}
export default UpdateEmail;
