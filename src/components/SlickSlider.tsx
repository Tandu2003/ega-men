"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function SlickSlider() {
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="prev absolute top-1/2 left-4 z-10 hidden h-10 w-10 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex"
        onClick={onClick}
      >
        <Image src="/svg/arrowdown.svg" alt="Previous" width={24} height={24} />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="next absolute top-1/2 right-4 z-10 hidden h-10 w-10 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex"
        onClick={onClick}
      >
        <Image src="/svg/arrowdown.svg" alt="Next" width={24} height={24} />
      </button>
    );
  };

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <Slider {...settings}>
            <div>
              <img
                src="https://theme.hstatic.net/200000696635/1001257291/14/slider_2.jpg?v=107"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                src="https://theme.hstatic.net/200000696635/1001257291/14/slider_1.jpg?v=107"
                alt="Slide 2"
              />
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
}
