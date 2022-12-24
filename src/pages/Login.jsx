import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";
import { todolistSlice } from "../store/todolistSlice";
import JournalImage from "../images/Journal-logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [gottenDataFromAPI, setGottenDataFromAPI] = useState("idle");
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const error = useSelector((state) => state.todos.error);
  const [errorState, setErrorState] = useState(false);
  const [error404, setError404] = useState(false);
  const [makePassVisible, setMakePassVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
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
        let sendUP = { username, password };
        const res = await fetch(`${apiURL}/getData/${JSON.stringify(sendUP)}`, {
          method: "GET",
        });
        const data = await res.json();
        const { token, ...rest } = data;
        if (!data.error) {
          const tokenReq = JSON.stringify({ jwt: `Bearer ${token}` });
          localStorage.setItem("token", tokenReq);
          dispatch(todolistSlice.actions.error(false));
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
      setNavigate(true);
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
              <div ref={bad} className="bad">
                .
              </div>
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
            <div className="logo">
              <img src={JournalImage} alt="Journal-logo"></img>
            </div>
            <div className="inputs">
              <label htmlFor="username">
                Username or Email Address: <br />
                <input
                  type="text"
                  id="username"
                  placeholder="email or username"
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
                    placeholder="password"
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
                  <Link
                    to={navigate ? "/forgottenPassword" : ""}
                    state={{ username }}
                  >
                    Forgotten Password
                  </Link>
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
