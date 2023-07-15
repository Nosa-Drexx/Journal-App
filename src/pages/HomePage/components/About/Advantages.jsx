// import { Slide } from "react-awesome-reveal";
import Card from "../../../../components/Card/Card";
import "./advantages.scss";

const Advantages = () => {
  return (
    <section id="about" className="advantages">
      <div className="cards-container">
        {/* card components */}

        {/* Slide in cards from top */}
        <Card
          header={"Work from Anywhere"}
          text={
            "Keep important info handy-your notes sync automatically across all devices."
          }
          animationDirection="up"
        >
          <i className="fa-solid fa-briefcase"></i>
        </Card>

        <div className="card-push-up">
          <Card
            header={"Remember Everything"}
            text={
              "Make more useful by bookmarking text, quick and easy access to texts"
            }
            bg="primary"
            animationDirection="up"
          >
            <i className="fa-solid fa-lightbulb"></i>
          </Card>
        </div>

        <Card
          header={"Find it Faster"}
          text={
            "Get what you need when you need it with powerful and flexible search capabilities"
          }
          animationDirection="up"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Card>
      </div>
    </section>
  );
};

export default Advantages;
