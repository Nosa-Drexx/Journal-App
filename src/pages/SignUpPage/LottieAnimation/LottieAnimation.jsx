import * as LottiePlayer from "@lottiefiles/lottie-player";

const LottieAnimation = () => {
  return (
    <div>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="./src/LottieAnimation/work-animation.json"
      ></lottie-player>
    </div>
  );
};

export default LottieAnimation;
