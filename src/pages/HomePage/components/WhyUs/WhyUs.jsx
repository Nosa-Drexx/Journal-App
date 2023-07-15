import "./why-us.scss";
import womanIpad from "../../images/woman-ipad.png";
import womanLaptop from "../../images/woman-laptop.png";
import womanPhone from "../../images/woman-phone.png";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const WhyUs = () => {
  return (
    <section id="why-us" className="why-us">
      {/* Meet Deadline */}
      <div className="why-us-container">
        <div className="why-us-text">
          <Slide direction="left" style={{ width: "100%" }}>
            <div className="illustration">
              <i className="fa-solid fa-calendar-days"></i>
            </div>
            <h3>Meet Every Deadline</h3>
            <p>
              Create and assign task in your notes with due dates, tasks and
              reminders so that nothing is missed.
            </p>
            <Link to="/signUp" className="sign-up">
              Learn more &rarr;
            </Link>
          </Slide>
        </div>

        <div className="why-us-image">
          <Slide direction="right" style={{ width: "100%", height: "100%" }}>
            <img src={womanLaptop} alt="woman with laptop" />
          </Slide>
        </div>
      </div>
      {/* Leave Paper Use */}
      <div className="why-us-container">
        <div className="why-us-text right-text">
          <Slide direction="right" style={{ width: "100%" }}>
            <div className="illustration">
              <i className="fa-solid fa-paperclip"></i>
            </div>
            <h3>Leave Paper Use</h3>
            <p>
              Type important information and save them on all your devices. Save
              the information not the messy one.
            </p>
            <Link to="/signUp" className="sign-up">
              Learn more &rarr;
            </Link>
          </Slide>
        </div>

        <div className="why-us-image left-image">
          <Slide direction="left" style={{ width: "100%", height: "100%" }}>
            <img src={womanIpad} alt="woman with laptop" />
          </Slide>
        </div>
      </div>

      {/* From Web clip */}
      <div className="why-us-container">
        <div className="why-us-text">
          <Slide direction="left" style={{ width: "100%" }}>
            <div className="illustration">
              <i className="fa-solid fa-laptop"></i>
            </div>
            <h3>Get It From Web Clip</h3>
            <p>
              Save web pages (no adds) and mark them with arrow, hightlights and
              text to make them more useful.
            </p>
            <Link to="/signUp" className="sign-up">
              Learn more &rarr;
            </Link>
          </Slide>
        </div>

        <div className="why-us-image">
          <Slide direction="right" style={{ width: "100%", height: "100%" }}>
            <img src={womanPhone} alt="woman with laptop" />
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
