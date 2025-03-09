"use client";

import { useState } from "react";

import Link from "next/link";

export default function TopBar() {
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  return (
    <>
      <div
        className={`top-banner bg-[#81AACC] relative transition-all duration-500 ${
          close ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="container text-center px-0">
          <Link
            className="relative text-white text-[12px] block h-7.5 leading-7.5 min-[991px]:text-[15px] min-[991px]:h-10 min-[991px]:leading-10"
            title="FREESHIP VỚI ĐƠN HÀNG TỪ 500K"
            href="/collections/all"
          >
            FREESHIP VỚI ĐƠN HÀNG TỪ 500K
          </Link>
          <button
            onClick={handleClose}
            className="z-[9] absolute top-1/2 -translate-y-1/2 right-1 bg-white rounded-full w-6 h-6"
          >
            <span className="text-xl leading-1 font-thin">&times;</span>
          </button>
        </div>
      </div>
    </>
  );
}
