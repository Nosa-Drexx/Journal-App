const CardElement = ({ children, header, text }) => {
  return (
    <>
      <div className="card-icon">
        <div className="icon-circle">{children}</div>
      </div>
      <div className="card-text">
        <h3>{header}</h3>
        <p>{text}</p>
      </div>
    </>
  );
};

export default CardElement;
