import * as LottiePlayer from "@lottiefiles/lottie-player";
import { create } from "@lottiefiles/lottie-interactivity";
import { useEffect, useRef } from "react";
import "./world-animation.scss";
import { Slide } from "react-awesome-reveal";

const WorldLottieAnimation = () => {
  const player = useRef(null);
  // useEffect(() => {
  //   import("lottie-interactive/dist/lottie-interactive.js");
  // });

  useEffect(() => {
    create({
      player: "#worldMap",
      mode: "cursor",
      actions: [
        {
          position: { x: [0, 1], y: [-1, 2] },
          type: "seek",
          transition: "click",
          frames: [0, 840],
        },
      ],
    });
  }, [player]);

  return (
    <section className="world-animation-section">
      <Slide direction="up" style={{ width: "100%", height: "100%" }}>
        <div className="lottie-container">
          {/* <lottie-interactive
            path="https://lottie.host/9e28bb4e-f2e4-46ad-a6a3-d279cb604f57/vnZp0Vs5yn.json"
            interaction="freeze-click"
            class="lottie-interactive-container"
            autoplay
            loop
          ></lottie-interactive> */}
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/9e28bb4e-f2e4-46ad-a6a3-d279cb604f57/vnZp0Vs5yn.json"
            id="worldMap"
            ref={player}
          ></lottie-player>
        </div>
      </Slide>
    </section>
  );
};

export default WorldLottieAnimation;
