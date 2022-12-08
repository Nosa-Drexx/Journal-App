import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
// import authSlice from "../store/authSlice";
import { todolistSlice } from "../store/todolistSlice";
// import { gsap } from "gsap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [gottenDataFromAPI, setGottenDataFromAPI] = useState("idle");
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const error = useSelector((state) => state.todos.error);
  const [errorState, setErrorState] = useState(error);
  const [error404, setError404] = useState(false);
  const [makePassVisible, setMakePassVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);

  useEffect(() => {
    dispatch(todolistSlice.actions.error(false));
  }, []);

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setEmailError(false);
        setErrorState(false);
        setError404(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorState, emailError, error404]);

  const loginAction = () => {
    const getDataFromApi = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/getData/${JSON.stringify({
            username,
            password,
          })}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        const { token, ...rest } = data;
        if (!data.error) {
          const tokenReq = JSON.stringify({ jwt: `Bearer ${token}` });
          localStorage.setItem("token", tokenReq);
        } else {
          setErrorState(true);
        }
        await dispatch(todolistSlice.actions.login(rest));
        setGottenDataFromAPI(data);
        setError404(false);
      } catch (e) {
        console.log(e);
        setError404(true);
        setGottenDataFromAPI("error");
      }
    };
    getDataFromApi();
    setGottenDataFromAPI("requestSent");
  };

  const requestForNewPassword = async (username) => {
    if (username !== "") {
      try {
        const dataOBJ = {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            username,
          }),
        };
        setEmailError("requestSent");
        const res = await fetch("http://localhost:8080/forgottenPass", dataOBJ);
        const data = await res.json();
        if (data.error) {
          setEmailError(data.error);
        } else {
          setEmailError("Email Sent");
        }
      } catch (e) {
        console.log(e);
        setEmailError("500! Server Error");
      }
    } else {
      setEmailError("Please put in a username");
    }
  };
  return (
    <>
      {currentUser.logIn ? (
        <Navigate to={`/dashBoard/${currentUser.username}`} />
      ) : gottenDataFromAPI === "requestSent" ||
        emailError === "requestSent" ? (
        <LoadingScreen />
      ) : (
        <section className="login">
          {errorState && (
            <div ref={animatebox} className="pop-out">
              {error.error}{" "}
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          {emailError && (
            <div ref={animatebox} className="pop-out">
              {emailError}
              {emailError !== "Email Sent" ? (
                <div ref={bad} className="bad">
                  .
                </div>
              ) : (
                <div ref={good} className="good">
                  .
                </div>
              )}
            </div>
          )}
          {error404 && (
            <div ref={animatebox} className="pop-out">
              500! Server Error
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAction();
            }}
          >
            <div className="logo">Todo List</div>
            <div className="inputs">
              <label htmlFor="username">
                Username: <br />
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="off"
                  required
                />
              </label>
              <br />
              <label htmlFor="password">
                Password: <br />
                <div className="pass-div">
                  <input
                    type={makePassVisible ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMakePassVisible((prev) => !prev)}
                    className="view-pass"
                  >
                    {!makePassVisible ? (
                      <span className="fa-solid fa-eye"></span>
                    ) : (
                      <span className="fa-solid fa-eye-slash"></span>
                    )}
                  </button>
                </div>
              </label>
            </div>
            <div className="button-container">
              <div className="log-sign-btn">
                <input type="submit" value="Login" />
                <button
                  type="button"
                  className="sign-btn"
                  onClick={() => dispatch(todolistSlice.actions.error(false))}
                >
                  <Link to="/signUp">Sign Up</Link>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="forgotten-password"
                  onClick={() => {
                    requestForNewPassword(username);
                  }}
                >
                  Forgotten Password
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
export default Login;
