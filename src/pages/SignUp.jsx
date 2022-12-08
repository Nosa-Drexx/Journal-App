import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [validPass, setValidPass] = useState("idle");
  const [error404, setError404] = useState(false);
  const [sendDataToAPI, setSendDataToAPI] = useState("idle");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRVisibility, setPasswordRVisibility] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current);

      const timer = setTimeout(() => {
        setUserExist(false);
        setValidPass(true);
        setError404(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [userExist, validPass, error404]);

  const submitForm = (e) => {
    e.preventDefault();
    const newUserData = {
      username,
      password,
      firstname: firstName,
      lastname: lastName,
      email,
    };

    async function addUserToAPI(userData) {
      setSendDataToAPI("requestSent");
      try {
        const dataOBJ = {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(userData),
        };
        const res = await fetch(`http://localhost:8080/newUser`, dataOBJ);
        const data = await res.json();
        console.log(data);
        setUserExist(data);
        setSendDataToAPI("ok");
      } catch (e) {
        console.log(e);
        setError404(true);
        setSendDataToAPI("error");
      }
    }

    if (password === passwordR) {
      setValidPass(true);
      addUserToAPI(newUserData);
    } else {
      setValidPass(false);
    }
  };
  return (
    <>
      {userExist.token ? (
        <Navigate to="/" />
      ) : sendDataToAPI === "requestSent" ? (
        <LoadingScreen />
      ) : (
        <div className="signup">
          {userExist.error && (
            <div ref={animatebox} className="pop-out">
              {userExist.error}
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          {!validPass && (
            <div ref={animatebox} className="pop-out">
              Password {`doesn/'t`} Match
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
          <form onSubmit={(e) => submitForm(e)}>
            <label htmlFor="firstName">
              FirstName: <br />
              <input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => setFirstName(e.target.value)}
                value={firstName}
                autoComplete="off"
                required
              />
            </label>
            <br />
            <label htmlFor="lastName">
              LastName: <br />
              <input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => setLastName(e.target.value)}
                value={lastName}
                autoComplete="off"
                required
              />
            </label>
            <br />
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
            <label htmlFor="email">
              E-mail: <br />
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                required
              />
            </label>
            <br />
            <label className="pass-label" htmlFor="password">
              Password: <br />
              <div>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="sign-pass"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength={8}
                  autoComplete="off"
                  required
                />{" "}
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
              </div>
            </label>
            <br />
            <label className="pass-label" htmlFor="re-password">
              Re-Type Password: <br />
              <div>
                <input
                  type={passwordRVisibility ? "text" : "password"}
                  className="sign-pass"
                  id="re-password"
                  onChange={(e) => setPasswordR(e.target.value)}
                  onBlur={(e) => setPasswordR(e.target.value)}
                  value={passwordR}
                  minLength={8}
                  autoComplete="off"
                  required
                />{" "}
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
                {password === passwordR ? (
                  <span className="icon">
                    <span className="fa-solid fa-circle-check"></span>
                  </span>
                ) : (
                  <span className="icon">
                    <span className="fa-solid fa-circle-xmark"></span>
                  </span>
                )}
              </div>
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </>
  );
}

export default SignUp;
