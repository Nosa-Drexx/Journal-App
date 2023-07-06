import "./nav-bar.scss";

const NavBarBiggerScreen = () => {
  return (
    <div className="home-nav-bar-bigger">
      <ul>
        <li>
          <a href="#home">Home</a>
          <span className="liner"> </span>
        </li>
        <li>
          <a href="#about">About</a>
          <span className="liner"> </span>
        </li>
        <li>
          <a href="#why-us">Why Us</a>
          <span className="liner"> </span>
        </li>
        <li>
          <a href="#socials">Socials</a>
          <span className="liner"> </span>
        </li>
      </ul>
    </div>
  );
};

export default NavBarBiggerScreen;
