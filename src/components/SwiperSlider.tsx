"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperSlider() {
  return (
    <motion.section
      className="section section-slider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/slider_1.png"
                alt="Slide 1"
                width={1920}
                height={781}
                priority
              />
            </motion.div>
          </SwiperSlide>
          <SwiperSlide>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/slider_2.png"
                alt="Slide 2"
                width={1920}
                height={781}
                priority
              />
            </motion.div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Arrows */}
        <motion.button
          className="prev absolute top-1/2 left-7.5 z-10 hidden h-10 w-10 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex"
          whileHover={{ scale: 1.2 }}
        >
          <Image
            src="/svg/arrowdown.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </motion.button>
        <motion.button
          className="next absolute top-1/2 right-7.5 z-10 hidden h-10 w-10 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center rounded-full bg-[#ebebeb] text-white md:flex"
          whileHover={{ scale: 1.2 }}
        >
          <Image src="/svg/arrowdown.svg" alt="Next" width={24} height={24} />
        </motion.button>
      </div>
    </motion.section>
  );
}
