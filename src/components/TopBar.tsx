"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  const [close, setClose] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setClose(true);
    setTimeout(() => {
      setHidden(true);
    }, 500);
  };

  if (!mounted || hidden) return null;

  return (
    <motion.div
      className="top-banner relative bg-[#81AACC]"
      initial={{ opacity: 0, y: -50 }}
      animate={close ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="container px-0 text-center">
        <Link
          className="relative block h-7.5 text-[12px] leading-7.5 text-white min-[991px]:h-10 min-[991px]:text-[15px] min-[991px]:leading-10"
          title="FREESHIP VỚI ĐƠN HÀNG TỪ 500K"
          href="/collections/all"
        >
          FREESHIP VỚI ĐƠN HÀNG TỪ 500K
        </Link>
        <motion.button
          onClick={handleClose}
          className="absolute top-1/2 right-1 z-[9] h-6 w-6 -translate-y-1/2 rounded-full bg-white"
          whileHover={{ scale: 1.2 }}
        >
          <span className="text-xl leading-1 font-thin">&times;</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
