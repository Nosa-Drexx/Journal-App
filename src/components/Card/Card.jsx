import "./card.scss";

const Card = ({ children, header, text, bg }) => {
  return (
    <div className="card" id={bg === "primary" ? "card-purple-bg" : ""}>
      <div className="card-icon">
        <div className="icon-circle">{children}</div>
      </div>
      <div className="card-text">
        <h3>{header}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
