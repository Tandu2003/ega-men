import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Collection() {
  const collection = [
    {
      title: "Áo khoác",
      href: "/collecions/ao-khoac",
      image: "/images/season_coll_1_img_large.png",
    },
    {
      title: "Áo sơ mi",
      href: "/collecions/ao-so-mi",
      image: "/images/season_coll_2_img_large.png",
    },
    {
      title: "Áo thun",
      href: "/collecions/ao-thun",
      image: "/images/season_coll_3_img_large.png",
    },
    {
      title: "Quần dài nam",
      href: "/collecions/quan-dai-nam",
      image: "/images/season_coll_4_img_large.png",
    },
    {
      title: "Quần jean",
      href: "/collecions/quan-jean",
      image: "/images/season_coll_5_img_large.png",
    },
    {
      title: "Quần short",
      href: "/collecions/quan-short",
      image: "/images/season_coll_6_img_large.png",
    },
  ];

  const settings = {
    infinite: false,
    arrows: false,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <section className="section section-collection">
        <div className="container">
          <h2 className="text-center text-[2rem] font-normal">
            Thời trang EGA
          </h2>
          <Slider {...settings}>
            {collection.map((item, index) => (
              <div
                key={index}
                className="p-[30px_15px] transition-transform duration-[0.64s] ease-[cubic-bezier(0.15,0.75,0.5,1)] hover:scale-110"
              >
                <Link href={item.href}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={270}
                    height={270}
                  />
                  <div className="mt-2.5 grid grid-cols-1">
                    <h5 className="text-center text-lg font-bold">
                      {item.title}
                    </h5>
                    <p className="text-center text-sm text-[#888]">
                      0 sản phẩm
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
