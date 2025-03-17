"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function SwiperSlider() {
  return (
    <section className="section section-slider">
      <div className="relative container">
        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          autoplay={{ delay: 10000 }}
          speed={500}
          loop={true}
        >
          <SwiperSlide>
            <Image
              src="/images/slider_1.png"
              alt="Slide 1"
              width={1920}
              height={781}
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/slider_2.png"
              alt="Slide 2"
              width={1920}
              height={781}
              priority
            />
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="prev absolute top-1/2 left-7.5 z-10 hidden h-10 w-10 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex">
          <Image
            src="/svg/arrowdown.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </button>
        <button className="next absolute top-1/2 right-7.5 z-10 hidden h-10 w-10 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex">
          <Image src="/svg/arrowdown.svg" alt="Next" width={24} height={24} />
        </button>
      </div>
    </section>
  );
}
