import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import animation from "../../animations/popupbox";
import LoadingScreen from "../../components/Loading/loadingScreen";
import { apiURL } from "../../store/actions";

function VerifyNewUsers() {
  const [emailId, setEmailId] = useState("");
  const [requestStats, setRequestStat] = useState(false);
  const [load, setLoad] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (good.current && requestStats.message) {
      setTimeout(() => {
        setNavigate(true);
      }, 3000);
    }
  });

  useEffect(() => {
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setRequestStat(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStats]);

  async function handleSubmit(emailId) {
    try {
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      };
      setLoad(true);
      const res = await fetch(`${apiURL}/verifyNewUser`, options);
      const data = await res.json();
      setLoad(false);
      setRequestStat(data);
    } catch (e) {
      console.log(e);
      setLoad(false);
      setRequestStat("error");
    }
  }
  return (
    <>
      {load ? (
        <LoadingScreen />
      ) : (
        <>
          {navigate && <Navigate to="/login" />}
          {requestStats.error && (
            <div ref={animatebox} className="pop-out">
              {requestStats.error}
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          {requestStats.message && (
            <div ref={animatebox} className="pop-out">
              {requestStats.message}
              <div ref={good} className="good">
                .
              </div>
            </div>
          )}
          {location?.state?.message && (
            <div ref={animatebox} className="pop-out">
              {location?.state?.message}
              <div ref={good} className="good">
                .
              </div>
            </div>
          )}
          {requestStats === "error" && (
            <div ref={animatebox} className="pop-out">
              500! Server Error
              <div ref={bad} className="bad">
                .
              </div>
            </div>
          )}
          <div className="verify">
            <div className="verify-text">
              Put in Verification code sent to your Email
            </div>
            <form
              className="verify-form"
              onSubmit={() => handleSubmit(emailId)}
            >
              <input
                className="verify-input"
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              ></input>
              <input className="verify-btn" type="submit" value="Verify" />
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default VerifyNewUsers;
