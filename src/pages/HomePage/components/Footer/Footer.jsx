import "./footer.scss";
import JournalImage from "../../../../images/Journal-text.png";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-correction"></div>
      <div className="navigations">
        <div className="anchor-links">
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
          </ul>
        </div>
        <div id="socials" className="socials">
          {/* Git Hub */}
          <a
            href="https://github.com/Nosa-Drexx"
            target="_blank"
            alt="github-link"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github socials-icon"></i>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nosa-egharevba/"
            target="_blank"
            alt="linkedIn-link"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin socials-icon"></i>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/NosaDrexx"
            target="_blank"
            alt="twitter-link"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter socials-icon"></i>
          </a>
        </div>
      </div>
      <div className="copy-right">
        <img src={JournalImage} alt="site-logo" />
        <p className="copy">&copy; 2022 JourNal. All rights reserved</p>
      </div>
    </section>
  );
};

export default Footer;
