import "./lottie-animation-container.scss";

const LottieAnimationContainer = ({ children }) => {
  return (
    <div className="lottie-animation-container">
      <div className="absolute"></div>
      <div className="first-circle"></div>
      <div className="second-circle"></div>
      <div className="third-circle"></div>
      <div className="lottie">{children}</div>
    </div>
  );
};

export default LottieAnimationContainer;
