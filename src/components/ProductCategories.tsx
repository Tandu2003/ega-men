"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

export default function ProductCategories() {
  const collection = [
    {
      title: "Áo khoác",
      href: "/collections/ao-khoac",
      image: "/images/season_coll_1_img_large.png",
    },
    {
      title: "Áo sơ mi",
      href: "/collections/ao-so-mi",
      image: "/images/season_coll_2_img_large.png",
    },
    {
      title: "Áo thun",
      href: "/collections/ao-thun",
      image: "/images/season_coll_3_img_large.png",
    },
    {
      title: "Quần dài nam",
      href: "/collections/quan-dai-nam",
      image: "/images/season_coll_4_img_large.png",
    },
    {
      title: "Quần jean",
      href: "/collections/quan-jean",
      image: "/images/season_coll_5_img_large.png",
    },
    {
      title: "Quần short",
      href: "/collections/quan-short",
      image: "/images/season_coll_6_img_large.png",
    },
  ];

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="section section-collection overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container p-4">
        <h2 className="text-center text-[2rem] font-normal">Thời trang EGA</h2>
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true, el: ".custom-scrollbar" }}
          breakpoints={{
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            0: { slidesPerView: 2.5 },
          }}
        >
          {collection.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.href} className="block">
                <motion.div
                  className="p-[30px_15px] transition-transform duration-500 ease-out hover:scale-110"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={270}
                    height={270}
                    className="h-auto w-full"
                  />
                  <div className="mt-2.5 text-center">
                    <h5 className="text-lg font-bold">{item.title}</h5>
                    <p className="text-sm text-[#888]">0 sản phẩm</p>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thanh cuộn tùy chỉnh */}
        <div
          ref={scrollbarRef}
          className={`custom-scrollbar relative mt-3 h-1 w-full rounded-full bg-gray-300 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>
    </motion.section>
  );
}
