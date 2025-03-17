"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopBar() {
  const [close, setClose] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClose = () => {
    setClose(true);
    setTimeout(() => {
      setHidden(true);
    }, 500);
  };

  if (hidden) return null;

  return (
    <div
      className={`top-banner relative bg-[#81AACC] transition-all duration-500 ${
        close ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="container px-0 text-center">
        <Link
          className="relative block h-7.5 text-[12px] leading-7.5 text-white min-[991px]:h-10 min-[991px]:text-[15px] min-[991px]:leading-10"
          title="FREESHIP VỚI ĐƠN HÀNG TỪ 500K"
          href="/collections/all"
        >
          FREESHIP VỚI ĐƠN HÀNG TỪ 500K
        </Link>
        <button
          onClick={handleClose}
          className="absolute top-1/2 right-1 z-[9] h-6 w-6 -translate-y-1/2 rounded-full bg-white"
        >
          <span className="text-xl leading-1 font-thin">&times;</span>
        </button>
      </div>
    </div>
  );
}
