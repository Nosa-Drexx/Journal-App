import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { todolistSlice } from "../../store/todolistSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JournalImage from "../../images/Journal-text.png";
import NavBar from "./components/NavBar/NavBar";
import NavBarBiggerScreen from "./components/NavBar/NavBarBiggerScreen";
import GetStarted from "./components/GetStarted/GetStarted";
import Advantages from "./components/About/Advantages";
import WhyUs from "./components/WhyUs/WhyUs";
import Footer from "./components/Footer/Footer";

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
        // moreTransparentWhite: "rgba(0, 0, 0, 0.12)",
        moreTransparentBlack: "rgba(255, 255, 255, 0.12)",
        textGray: "white",
      };
      theme?.style.setProperty(
        "--moreTransparentBlack",
        "rgba(255, 255, 255, 0.12)"
      );
      theme?.style.setProperty("--black", "white");
      theme?.style.setProperty("--white", "black");
      theme?.style.setProperty("--boxShadow", "rgba(255, 255, 255, 0.6)");
      theme?.style.setProperty("--lightWhite", "rgba(255, 255, 255, 0.792)");
      theme?.style.setProperty("--textGray", "white");
      // theme?.style.setProperty(
      //   "--moreTransparentWhite",
      //   "rgba(255, 255, 255, 0.12)"
      // );
      localStorage.setItem("color", JSON.stringify(data));
    }
    // Light Mode
    else {
      const data = {
        white: "white",
        black: "black",
        boxShadow: "rgba(0, 0, 0, 0.6)",
        lightWhite: "rgba(28, 27, 27, 0.817)",
        moreTransparentBlack: "rgba(0, 0, 0, 0.12)",
        // moreTransparentWhite: "rgba(255, 255, 255, 0.12)",
      };
      theme?.style.setProperty("--moreTransparentBlack", "rgba(0, 0, 0, 0.12)");
      theme?.style.setProperty("--white", "white");
      theme?.style.setProperty("--black", "black");
      theme?.style.setProperty("--boxShadow", "rgba(0, 0, 0, 0.6)");
      theme?.style.setProperty("--lightWhite", "rgba(28, 27, 27, 0.817)");
      theme?.style.setProperty("--textGray", "rgb(68, 63, 63)");
      // theme?.style.setProperty(
      //   "--moreTransparentWhite",
      //   "rgba(255, 255, 255, 0.12)"
      // );
      localStorage.setItem("color", JSON.stringify(data));
    }
  }

  return (
    <div className="home-container">
      <div className="nav-correction"></div>
      <div className="home">
        {/* Header and Nav section  */}
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
          </div>
        </header>

        {/* Hero Section */}
        <GetStarted />

        {/* About Section */}
        <Advantages />

        {/* Why Us section */}
        <WhyUs />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
