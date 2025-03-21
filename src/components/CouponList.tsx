import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import CouponItem from "./CouponItem";

export default function CouponList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  const coupons = [
    {
      image: "/images/coupon_1_img.png",
      code: "EGA10",
      condition: [
        "Mã giảm 10% cho đơn hàng tối thiểu 1.5 triệu",
        "Giảm tối đa 500k",
      ],
    },
    {
      image: "/images/coupon_2_img.png",
      code: "EGA15",
      condition: [
        "Mã giảm 15% cho đơn hàng tối thiểu 2 triệu",
        "Giảm tối đa 500k",
      ],
    },
    {
      image: "/images/coupon_3_img.png",
      code: "EGA99",
      condition: [
        "Giảm giá 99k các sản phẩm Áo thun",
        "Tổng giá trị sản phẩm từ 1 triệu trở lên",
      ],
    },
    {
      image: "/images/coupon_4_img.png",
      code: "EGAFREESHIP",
      condition: [
        "Miễn phí ship 100K cho đơn hàng tối thiểu từ 500.000đ",
        "Áp dụng cho tất cả tỉnh / thành phố",
      ],
    },
  ];

  return (
    <section ref={ref} className="section section-coupon">
      <div className="container">
        <motion.h2
          className="text-center text-[2rem] font-normal"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Mã giảm giá EGA
        </motion.h2>
        <motion.div
          className="no-scrollbar my-2.5 flex gap-4 overflow-x-auto px-[15px] lg:grid lg:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15,
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          {coupons.map((coupon, index) => (
            <motion.div
              key={index}
              className="my-2.5 min-w-75 lg:min-w-0"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CouponItem coupon={coupon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
