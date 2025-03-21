"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Policy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  return (
    <motion.section
      ref={ref}
      className="section section-policy"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          {[
            {
              src: "/images/policies_icon_1.png",
              title: "Miễn phí vận chuyển",
              desc: "Nhận hàng trong vòng 3 ngày",
            },
            {
              src: "/images/policies_icon_2.png",
              title: "Quà tặng hấp dẫn",
              desc: "Nhiều ưu đãi khuyến mãi hot",
            },
            {
              src: "/images/policies_icon_3.png",
              title: "Bảo đảm chất lượng",
              desc: "Sản phẩm đã được kiểm định",
            },
            {
              src: "/images/policies_icon_4.png",
              title: "Hotline: 19001993",
              desc: "Dịch vụ hỗ trợ bạn 24/7",
            },
          ].map((policy, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2.5 space-x-4 lg:flex-row"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={policy.src}
                alt={policy.title}
                width={40}
                height={40}
              />
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-bold lg:mb-[5px] lg:text-base">
                  {policy.title}
                </h3>
                <p className="text-xs opacity-75 lg:text-sm">{policy.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
