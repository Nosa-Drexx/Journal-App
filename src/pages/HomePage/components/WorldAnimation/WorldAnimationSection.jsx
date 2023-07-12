// import * as LottiePlayer from "@lottiefiles/lottie-player";
import { useEffect } from "react";
import "./world-animation.scss";

const WorldLottieAnimation = () => {
  useEffect(() => {
    import("lottie-interactive/dist/lottie-interactive.js");
  });

  return (
    <section className="world-animation-section">
      <div className="lottie-container">
        <lottie-interactive
          path="https://lottie.host/9e28bb4e-f2e4-46ad-a6a3-d279cb604f57/vnZp0Vs5yn.json"
          interaction="freeze-click"
          class="lottie-interactive-container"
          autoplay
          loop
        ></lottie-interactive>
      </div>
    </section>
  );
};

export default WorldLottieAnimation;
