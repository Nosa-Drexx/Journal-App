import CardElement from "./CardElements";
import "./card.scss";
import { Slide } from "react-awesome-reveal";

const Card = ({ children, header, text, bg, animationDirection }) => {
  return (
    <>
      {/* Add slide component if animationDirection props exits */}
      {animationDirection ? (
        <Slide
          direction={animationDirection}
          className="card card-animation-container"
        >
          <div className="card" id={bg === "primary" ? "card-purple-bg" : ""}>
            <CardElement header={header} text={text}>
              {children}
            </CardElement>
          </div>
        </Slide>
      ) : (
        <div className="card" id={bg === "primary" ? "card-purple-bg" : ""}>
          <CardElement header={header} text={text}>
            {children}
          </CardElement>
        </div>
      )}
    </>
  );
};

export default Card;
