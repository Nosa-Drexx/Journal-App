import "./footer.scss";
import JournalImage from "../../../../images/Journal-text.png";
import { Slide } from "react-awesome-reveal";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-correction"></div>
      <div className="navigations">
        <div className="anchor-links">
          <ul>
            {/* Each list comes in after it previous slibing */}
            <Slide
              cascade
              direction="left"
              duration={600}
              style={{ width: "100%" }}
            >
              <li>
                <a href="#home">Home</a>
                <span className="liner"> </span>
              </li>

              {/* Slides in after 600 milliseconds */}
              <li>
                <a href="#about">About</a>
                <span className="liner"> </span>
              </li>

              {/* Slides in after 1200 milliseconds */}
              <li>
                <a href="#why-us">Why Us</a>
                <span className="liner"> </span>
              </li>
            </Slide>
          </ul>
        </div>
        <div id="socials" className="socials">
          {/* Each link Slide in from the direction="up" after previous slibing */}
          {/* Git Hub */}
          <Slide cascade direction="up" duration={600}>
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
          </Slide>
        </div>
      </div>
      <div className="copy-right">
        <Slide
          direction="up"
          duration={600}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={JournalImage} alt="site-logo" />
          <p className="copy">&copy; 2022 JourNal. All rights reserved</p>
        </Slide>
      </div>
    </section>
  );
};

export default Footer;
