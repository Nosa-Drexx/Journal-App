import "./get-started.scss";
import RobotImage from "../../images/robot-with-clipboard.png";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

const GetStarted = () => {
  return (
    <section id="home" className="get-started">
      <div className="call-to-action">
        {/* Fade in main text */}
        <Fade left duration={1000}>
          <div className="contain-text">
            <span className="transparent-combinator">&</span>
            <h1>
              Paperless <br /> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Easy
            </h1>
          </div>
        </Fade>

        {/* Fade in sub text */}
        <Fade top duration={500} delay={900}>
          <p className="sub-text">
            This is the absolute way to make your notes easier and save the
            earth as well. <br />
            Anthing will be better.
          </p>
          <Link to="./signUp" className="get-started-btn">
            Get Started
          </Link>
        </Fade>
      </div>

      {/* Fade illustration */}

      <Fade right delay={500} duration={1000}>
        <div className="robot-illustration">
          <img
            src={RobotImage}
            alt="A robot with a clipboard"
            className="robot-image"
          />
        </div>
      </Fade>
    </section>
  );
};

export default GetStarted;
