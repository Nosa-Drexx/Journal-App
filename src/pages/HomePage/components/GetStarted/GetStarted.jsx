import "./get-started.scss";
import RobotImage from "../../images/robot-with-clipboard.jpg";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section id="home" className="get-started">
      <div className="call-to-action">
        <div className="contain-text">
          <span className="transparent-combinator">&</span>
          <h1>
            Paperless <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Easy
          </h1>
        </div>
        <p className="sub-text">
          This is the absolute way to make your notes easier and save the earth
          as well. <br />
          Anthing will be better.
        </p>
        <Link to="./signUp" className="get-started-btn">
          Get Started
        </Link>
      </div>
      <div className="robot-illustration">
        <img
          src={RobotImage}
          alt="A robot with a clipboard"
          className="robot-image"
        />
      </div>
    </section>
  );
};

export default GetStarted;
