"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.section
        className="section page-404"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mt-4 py-5">
          <div className="row">
            <motion.div
              className="flex w-full flex-col items-center justify-center px-2.5 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/images/404.png" alt="404" width={600} height={267} />
              <h1 className="mt-10 text-3xl">TRANG KHÔNG ĐƯỢC TÌM THẤY</h1>
              <p className="text-[#727272]">
                Thật tiếc! Trang của bạn yêu cầu không tồn tại.
                <br />
                Vui lòng thử với một trang khác hoặc liên hệ để được hỗ trợ nhé!
              </p>
              <Link href="/" className="btn btn-primary mt-4">
                Về trang chủ
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
