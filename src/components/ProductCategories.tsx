"use client";

import { useRef } from "react";
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hiển thị thanh cuộn
  const showScrollbar = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.classList.remove("opacity-0");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (scrollbarRef.current) {
          scrollbarRef.current.classList.add("opacity-0");
        }
      }, 500);
    }
  };

  return (
    <section className="section section-collection overflow-hidden">
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
          onTouchMove={showScrollbar}
        >
          {collection.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.href} className="block">
                <div className="p-[30px_15px] transition-transform duration-500 ease-out hover:scale-110">
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
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thanh cuộn tùy chỉnh */}
        <div
          ref={scrollbarRef}
          className="custom-scrollbar relative mt-3 h-1 w-full rounded-full bg-transparent opacity-0 transition-opacity duration-300"
        ></div>
      </div>
    </section>
  );
}
