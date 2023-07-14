import "./footer.scss";
import JournalImage from "../../../../images/Journal-text.png";
import { Fade } from "react-reveal";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-correction"></div>
      <div className="navigations">
        <div className="anchor-links">
          <ul>
            {/* Each list comes in after it previous slibing */}
            <Fade left duration={600}>
              <li>
                <a href="#home">Home</a>
                <span className="liner"> </span>
              </li>
            </Fade>

            {/* Fades in after 600 milliseconds */}
            <Fade left duration={600} delay={600}>
              <li>
                <a href="#about">About</a>
                <span className="liner"> </span>
              </li>
            </Fade>

            {/* Fades in after 1200 milliseconds */}
            <Fade left duration={600} delay={1200}>
              <li>
                <a href="#why-us">Why Us</a>
                <span className="liner"> </span>
              </li>
            </Fade>
          </ul>
        </div>
        <div id="socials" className="socials">
          {/* Each link fade in from the bottom after previous slibing */}
          {/* Git Hub */}
          <Fade bottom duration={600}>
            <a
              href="https://github.com/Nosa-Drexx"
              target="_blank"
              alt="github-link"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github socials-icon"></i>
            </a>
          </Fade>

          {/* LinkedIn */}
          <Fade bottom duration={600} delay={600}>
            <a
              href="https://www.linkedin.com/in/nosa-egharevba/"
              target="_blank"
              alt="linkedIn-link"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin socials-icon"></i>
            </a>
          </Fade>

          {/* Twitter */}
          <Fade bottom duration={600} delay={1200}>
            <a
              href="https://twitter.com/NosaDrexx"
              target="_blank"
              alt="twitter-link"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter socials-icon"></i>
            </a>
          </Fade>
        </div>
      </div>
      <Fade bottom duration={600}>
        <div className="copy-right">
          <img src={JournalImage} alt="site-logo" />
          <p className="copy">&copy; 2022 JourNal. All rights reserved</p>
        </div>
      </Fade>
    </section>
  );
};

export default Footer;
