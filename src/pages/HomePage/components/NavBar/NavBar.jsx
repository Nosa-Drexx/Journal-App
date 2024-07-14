import { useEffect, useRef, useState } from "react";
import "./nav-bar.scss";

const NavBar = () => {
  const [navState, setNavState] = useState(false);
  const nav = useRef(null);

  useEffect(() => {
    if (!navState) {
      nav.current.style.height = "0px";
    } else {
      nav.current.style.height = "135px";
    }
  }, [navState]);

  return (
    <div className="home-nav-bar">
      <button className="nav-btn" onClick={() => setNavState((prev) => !prev)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul ref={nav}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#why-us">Why Us</a>
        </li>
        <li>
          <a href="#socials">Socials</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
