"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function FloatingButtons() {
  const [isShow, setIsShow] = useState(false);

  const handleGoToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed !top-auto right-3 bottom-[85px] z-999">
        <Link
          href=""
          className={`backtop flex items-center justify-center ${
            isShow ? "show" : ""
          }`}
          title="Lên đầu trang"
          onClick={handleGoToTop}
        >
          <Image
            src="svg/arrowdown.svg"
            alt="arrowdown"
            width={30}
            height={30}
            className="rotate-180 transform invert-100"
          />
        </Link>
        <ul className="hidden sm:block">
          <li className="mb-[5px]">
            <Link
              href=""
              className="group relative hover:opacity-[0.9] hover:shadow-[0_5px_10px_rgba(0,0,0,0.15),0_4px_15px_rgba(0,0,0,0.13)]"
            >
              <Image
                src="/svg/addthis-phone.svg"
                alt="Gọi ngay cho chúng tôi"
                width={44}
                height={44}
              />
              <span className="tooltip-text">Gọi ngay cho chúng tôi</span>
            </Link>
          </li>
          <li className="mb-[5px]">
            <Link
              href=""
              className="group relative hover:opacity-[0.9] hover:shadow-[0_5px_10px_rgba(0,0,0,0.15),0_4px_15px_rgba(0,0,0,0.13)]"
            >
              <Image
                src="/svg/addthis-zalo.svg"
                alt="Chat với chúng tôi qua Zalo"
                width={44}
                height={44}
              />
              <span className="tooltip-text">Chat với chúng tôi qua Zalo</span>
            </Link>
          </li>
          <li className="mb-[5px]">
            <Link
              href=""
              className="group relative hover:opacity-[0.9] hover:shadow-[0_5px_10px_rgba(0,0,0,0.15),0_4px_15px_rgba(0,0,0,0.13)]"
            >
              <Image
                src="/svg/addthis-messenger.svg"
                alt="Chat với chúng tôi qua Messenger"
                width={44}
                height={44}
              />
              <span className="tooltip-text">
                Chat với chúng tôi qua Messenger
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
