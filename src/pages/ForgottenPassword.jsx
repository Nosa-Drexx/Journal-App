import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);
  const location = useLocation(false);

  useEffect(() => {
    if (good.current) {
      setTimeout(() => {
        setNavigate(true);
      }, 2000);
    }
  });

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setEmailError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [emailError]);

  async function handleSubmit(username, email) {
    if (email !== "") {
      try {
        const dataOBJ = {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            username,
            email,
          }),
        };
        setLoading(true);
        const res = await fetch(`${apiURL}/forgottenPass`, dataOBJ);
        const data = await res.json();
        setLoading(false);
        if (data.error) {
          setEmailError(data.error);
        } else {
          setEmailError("Email Sent");
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setEmailError("Error Connecting to Server");
      }
    } else {
      setEmailError("Please put in an email Address");
    }
  }

  return (
    <>
      {navigate && <Navigate to="/login" />}
      {!location.state && <Navigate to="/login" />}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {emailError && (
            <div ref={animatebox} className="pop-out">
              {emailError}
              {emailError === "Email Sent" ? (
                <div ref={good} className="good">
                  .
                </div>
              ) : (
                <div ref={bad} className="bad">
                  .
                </div>
              )}
            </div>
          )}
          <div className="verify">
            <form
              className="verify-form"
              onSubmit={() => handleSubmit(location?.state?.username, email)}
            >
              <input
                className="verify-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input className="verify-btn" type="submit" value="Request" />
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default ForgottenPassword;
