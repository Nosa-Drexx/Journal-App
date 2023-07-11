import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todolistSlice } from "../../store/todolistSlice";
import "./light-dark-mode.scss";

const theme = document.documentElement;

function LightDarkMode() {
  const darkOrLight = useSelector((state) => state.todos.lightDarkMode);
  const dispatch = useDispatch();
  const control = useRef();

  useEffect(() => {
    toggle();
    if (control) {
      if (darkOrLight) {
        control.current.style.left = "60%";
      } else if (!darkOrLight) {
        control.current.style.left = "5%";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkOrLight]);

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
    <div className="light-dark-mode">
      <span>Light or Dark mode toggle</span>
      <div className="main-container-relative">
        <div className="wrapper">
          <div className="design">
            <button
              ref={control}
              onClick={() => dispatch(todolistSlice.actions.lightDarkMode())}
              className="togglebtn"
            >
              {darkOrLight ? (
                <i className="fa-solid fa-sun day"></i>
              ) : (
                <i className="fa-solid fa-moon night"></i>
              )}
            </button>
            {darkOrLight ? "D" : "L"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightDarkMode;
