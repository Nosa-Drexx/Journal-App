import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import animation from "../animations/popupbox";
import LoadingScreen from "../components/loadingScreen";
import { apiURL } from "../store/actions";
import { todolistSlice } from "../store/todolistSlice";

function UploadImage() {
  const currentUser = useSelector((state) => state.todos.AllUserInfo);
  const [imageState, setImageState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reqResult, setReqResult] = useState({});
  const [navigate, setNavigate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const animatebox = useRef(null);
  const bad = useRef(null);
  const good = useRef(null);
  const src = useRef(null);
  const profileImage = useSelector((state) => state.todos.profileImage);
  const bigSrc = useRef(null);

  useEffect(() => {
    if (good.current) {
      setTimeout(() => {
        setNavigate(true);
      }, 2000);
    }
  });

  useEffect(() => {
    if (showModal && bigSrc && src) {
      bigSrc.current.src = src.current.src;
    }
  }, [showModal]);

  useEffect(() => {
    if (profileImage) {
      src.current.src = profileImage;
    }
    if (src && !profileImage && !loading) {
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
    if (reqResult.userData) {
      dispatch(todolistSlice.actions.login(reqResult.userData));
    }
    if (animatebox.current) {
      animation(animatebox.current, bad.current, good.current);

      const timer = setTimeout(() => {
        setReqResult({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqResult]);

  function getFileData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user-image", e.target.files[0], e.target.files[0].name);
    setImageState(formData);
  }
  async function uploadFileToServer(e) {
    e.preventDefault();
    if (imageState) {
      try {
        const token = localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).jwt
          : "Bearer unauthorized";

        const dataOBJ = {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: imageState,
        };
        setLoading(true);
        const result = await fetch(`${apiURL}/update/uploadImage`, dataOBJ);
        const answer = await result.json();
        setLoading(false);
        setReqResult(answer);
        dispatch(todolistSlice.actions.profileImage(null));
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      setReqResult({ error: "Please Upload an Image" });
    }
  }
  return (
    <div className="image-page">
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
              {
                <>
                  <>
                    {showModal && (
                      <div className="full-image">
                        <button onClick={() => setShowModal(false)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img ref={bigSrc} src="" alt="Profile" />
                      </div>
                    )}
                  </>
                  <button
                    onClick={() => setShowModal(true)}
                    className="image-modal-container"
                  >
                    <div className="image-modal">
                      <img ref={src} src="" alt="Profile" />
                      <div className="darker-modal"></div>
                    </div>
                  </button>
                </>
              }
              <div className="upload-image">
                <div className="back">
                  <button>
                    <Link to={`/dashBoard/${currentUser.username}/myAccount`}>
                      <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                  </button>
                </div>
                <input type="file" onChange={getFileData} />
                <button className="upload-btn" onClick={uploadFileToServer}>
                  Upload
                </button>
                <br />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default UploadImage;
