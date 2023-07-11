import "./lottie-animation-container.scss";

const LottieAnimationContainer = ({ children }) => {
  return (
    <div className="lottie-animation-container">
      <div className="absolute"></div>
      <div className="first-circle"></div>
      <div className="second-circle"></div>
      <div className="third-circle"></div>
      {children}
    </div>
  );
};

export default LottieAnimationContainer;
