import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";

function UpdatePassword() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [Rpassword, setRPassword] = useState("");
  const [reqResult, setReqResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRVisibility, setPasswordRVisibility] = useState(false);
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const animatebox = useRef(null);
  const [showForgottenPass, setShowForgottenPass] = useState(false);
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
    }
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setReqResult({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqResult]);

  async function handleSubmit(e, oldpassword, password, Rpassword) {
    e.preventDefault();
    if (password !== Rpassword) {
      setReqResult({ error: "Password doesn't match" });
    } else {
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
          body: JSON.stringify({ oldpassword, password }),
        };
        setLoading(true);
        const result = await fetch(`${apiURL}/update/password`, dataOBJ);
        const answer = await result.json();
        setLoading(false);
        if (answer.error) setShowForgottenPass(true);
        setReqResult({ ...answer });
      } catch (e) {
        console.log(e);
        setLoading(false);
        setReqResult({ error: "Error Connecting to Server" });
      }
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
              {reqResult.error}
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          {reqResult.message && (
            <div ref={animatebox} className="pop-out">
              {reqResult.message}
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
              className="verify-form update-password"
              onSubmit={(e) =>
                handleSubmit(e, oldpassword, password, Rpassword)
              }
            >
              <label>
                <input
                  className="verify-input"
                  type={oldPasswordVisibility ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldpassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  minLength={8}
                  required
                ></input>{" "}
                <button
                  type="button"
                  onClick={() => setOldPasswordVisibility((prev) => !prev)}
                  className="pass-visibility"
                >
                  {!oldPasswordVisibility ? (
                    <span className="fa-solid fa-eye"></span>
                  ) : (
                    <span className="fa-solid fa-eye-slash"></span>
                  )}
                </button>
                {oldpassword.length >= 8 ? (
                  <span className="icon">
                    <span className="fa-solid fa-circle-check"></span>
                  </span>
                ) : (
                  <span className="icon">
                    <span className="fa-solid fa-circle-xmark"></span>
                  </span>
                )}
              </label>
              <label>
                <input
                  className="verify-input"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="New Username"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                ></input>{" "}
                <button
                  type="button"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                  className="pass-visibility"
                >
                  {!passwordVisibility ? (
                    <span className="fa-solid fa-eye"></span>
                  ) : (
                    <span className="fa-solid fa-eye-slash"></span>
                  )}
                </button>
                {password.length >= 8 ? (
                  <span className="icon">
                    <span className="fa-solid fa-circle-check"></span>
                  </span>
                ) : (
                  <span className="icon">
                    <span className="fa-solid fa-circle-xmark"></span>
                  </span>
                )}
              </label>
              <label>
                <input
                  className="verify-input"
                  type={passwordRVisibility ? "text" : "password"}
                  placeholder="Retype New Username"
                  value={Rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  minLength={8}
                  required
                ></input>{" "}
                <button
                  type="button"
                  onClick={() => setPasswordRVisibility((prev) => !prev)}
                  className="pass-visibility"
                >
                  {!passwordRVisibility ? (
                    <span className="fa-solid fa-eye"></span>
                  ) : (
                    <span className="fa-solid fa-eye-slash"></span>
                  )}
                </button>
                {password === Rpassword && Rpassword !== "" ? (
                  <span className="icon">
                    <span className="fa-solid fa-circle-check"></span>
                  </span>
                ) : (
                  <span className="icon">
                    <span className="fa-solid fa-circle-xmark"></span>
                  </span>
                )}
              </label>
              <input className="verify-btn" type="submit" value="Update" />
            </form>
            {showForgottenPass && (
              <Link
                to="/forgottenPassword"
                state={{ username: currentUser.username }}
              >
                Forgotten Password
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
}
export default UpdatePassword;
