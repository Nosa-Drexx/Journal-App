import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";

function ReactSlick() {
  const [elem, setElem] = useState(null);
  const show = useRef(null);
  const homeModal = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesPerRow: 3,
  };

  useEffect(() => {
    if (elem && show) {
      const showImage = elem.target.className;

      show.current.src = `./src/images/${showImage}.png`;
    }
  }, [elem]);
  return (
    <>
      {elem && (
        <div ref={homeModal} className="home-modal">
          <button onClick={() => setElem(null)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <img src="" alt="site-view" className="show-image" ref={show}></img>
        </div>
      )}
      <Slider {...settings}>
        <div className="site-images">
          <button
            onClick={(e) => setElem(() => e)}
            className="overview"
          ></button>
        </div>
        <div className="site-images">
          <button
            onClick={(e) => setElem(() => e)}
            className="image-light"
          ></button>
        </div>
        <div className="site-images">
          <button
            onClick={(e) => setElem(e)}
            className="setting-light"
          ></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="setting-dark"></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="account"></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="edit"></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="image"></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="full-photo"></button>
        </div>
        <div className="site-images">
          <button onClick={(e) => setElem(e)} className="delete"></button>
        </div>
      </Slider>
    </>
  );
}

export default ReactSlick;
