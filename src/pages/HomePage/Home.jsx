import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { todolistSlice } from "../../store/todolistSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ReactSlick from "../../components/React-Slick/react-slick";
import JournalImage from "../../images/Journal-text.png";
import NavBar from "./components/NavBar/NavBar";
import NavBarBiggerScreen from "./components/NavBar/NavBarBiggerScreen";

const theme = document.documentElement;

function Home() {
  const darkOrLight = useSelector((state) => state.todos.lightDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    toggle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkOrLight]);

  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  }, []);

  function toggle() {
    // Dark Mode
    if (darkOrLight) {
      const data = {
        black: "white",
        white: "black",
        boxShadow: "rgba(255, 255, 255, 0.6)",
        lightWhite: "rgba(255, 255, 255, 0.792)",
      };
      theme?.style.setProperty("--black", "white");
      theme?.style.setProperty("--white", "black");
      theme?.style.setProperty("--boxShadow", "rgba(255, 255, 255, 0.6)");
      theme?.style.setProperty("--lightWhite", "rgba(255, 255, 255, 0.792)");
      localStorage.setItem("color", JSON.stringify(data));
    }
    // Light Mode
    else {
      const data = {
        white: "white",
        black: "black",
        boxShadow: "rgba(0, 0, 0, 0.6)",
        lightWhite: "rgba(28, 27, 27, 0.817)",
      };
      theme?.style.setProperty("--white", "white");
      theme?.style.setProperty("--black", "black");
      theme?.style.setProperty("--boxShadow", "rgba(0, 0, 0, 0.6)");
      theme?.style.setProperty("--lightWhite", "rgba(28, 27, 27, 0.817)");
      localStorage.setItem("color", JSON.stringify(data));
    }
  }

  return (
    <div className="home-container">
      <div className="home">
        <header>
          <Link className="logo" to="/">
            <img src={JournalImage} alt="JourNal-logo"></img>
          </Link>
          <div className="navSection">
            <button
              onClick={() => dispatch(todolistSlice.actions.lightDarkMode())}
              className="togglebtn"
            >
              {darkOrLight ? (
                <i className="fa-solid fa-sun day"></i>
              ) : (
                <i className="fa-solid fa-moon night"></i>
              )}
            </button>
            <NavBar />
            <NavBarBiggerScreen />
            {/* <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Nosa-Drexx"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/nosa-egharevba-984792243"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/NosaDrexx"
            >
              <i className="fa-brands fa-twitter"></i>
            </a> */}
          </div>
        </header>

        {/* Login */}
        {/* <section className="login-section">
          <div className="home-info">
            <div className="home-login">
              <div className="journal-sketch"></div>
              <div className="getin-journal">
                <Link to="/login" className="login-btn">
                  Login
                </Link>
                <Link to="/signUp" className="signup-btn">
                  SignUp
                </Link>
              </div>
            </div>
            <div className="about-journal">
              <div className="text-container">
                <h3 className="starting-text"> Hi there! Welcome to JourNal</h3>
                <p className="middle-text">
                  We are a secure website that helps you store and secure your
                  daily activities, and secrets on the web,
                </p>
                <p className="final-text">
                  !Dump the books, they get old someday, Let us be your Pen 🖋
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="slick-container">
          <ReactSlick />
        </section> */}
      </div>
    </div>
  );
}

export default Home;
