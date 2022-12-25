import { gsap } from "gsap";

let stackbox = 100; // do not change, helps animation

async function animation(animatebox, bad, good) {
  const dl = gsap.timeline();
  if (animatebox) {
    animatebox.style.zIndex = ++stackbox; // allow box to aways stack on each other.
    animatebox.style.top = `${20 + window.scrollY}px`; // always make animatebox in view even when user scrolls down.
    await dl.fromTo(
      animatebox,
      0.5,
      {
        ease: "elastic.out(1, 0.3)",
        xPercent: 40,
      },
      {
        ease: "elastic.out(1, 0.3)",
        xPercent: 1,
      }
    );
  }
  if (bad) {
    await dl.fromTo(
      bad,
      0.5,
      {
        delay: 1.5,
        scaleX: 1,
        ease: "circ.out",
      },
      {
        delay: 1.5,
        scaleX: 0.01,
        ease: "circ.out",
        transformOrigin: "100% 50%",
      }
    );
  }
  if (good) {
    await dl.fromTo(
      good,
      0.5,
      {
        delay: 1.5,
        scaleX: 1,
        ease: "circ.out",
      },
      {
        delay: 1.5,
        scaleX: 0.01,
        ease: "circ.out",
        transformOrigin: "100% 50%",
      }
    );
  }
  if (animatebox) {
    await dl.to(animatebox, 0.3, {
      xPercent: 150,
      display: "none",
    });
  }
}

export function sideAnimation(elem) {
  if (elem) {
    const tl = gsap.timeline();
    tl.from(elem, 1, {
      x: 200,
      ease: "elastic.out(2.5, 0.3)",
    });
  }
}

export default animation;
