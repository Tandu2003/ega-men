"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const footerData = {
  logo: "/images/logo-footer.png",
  address: "150/8 Nguyễn Duy Cung, Phường 12, Tp.HCM",
  phone: "19001393",
  email: "support@egany.com",
  social: {
    facebook: "https://www.facebook.com/",
    zalo: "https://zalo.me/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    tiktok: "https://www.tiktok.com/",
  },
};

const policies = [
  { href: "/pages/about-us", label: "Giới thiệu" },
  { href: "/pages/danh-sach-cua-hang", label: "Danh sách cửa hàng" },
  { href: "/pages/cau-hoi-thuong-gap", label: "Câu hỏi thường gặp" },
  { href: "/pages/goi-dien-dat-hang", label: "Gọi điện đặt hàng" },
];

const customerSupport = [
  { href: "/pages/lien-he", label: "Liên hệ" },
  { href: "/pages/chinh-sach-ban-hang", label: "Chính sách bán hàng" },
  { href: "/pages/chinh-sach-giao-hang", label: "Chính sách giao hàng" },
  { href: "/pages/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
];

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize(); // Kiểm tra ngay khi component mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-bold">{title}</h3>
        <motion.img
          src="/svg/arrowdown.svg"
          alt="arrow-down"
          width={16}
          height={16}
          className="block filter-[invert(1)] md:hidden"
          animate={{ rotate: isOpen ? -180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
      <motion.ul
        initial={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {links.map(({ href, label }) => (
          <li key={href} className="mt-2.5">
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[15px] text-[var(--footer-color)]">
      <div className="container pt-4 pb-2">
        <div className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-4">
          <div>
            <Image
              src={footerData.logo}
              alt="logo-footer"
              width={164}
              height={50}
            />
            <ul className="mt-2.5 space-y-2.5">
              <li>
                <p>
                  <span>Địa chỉ: </span>
                  {footerData.address}
                </p>
              </li>
              <li>
                <p>
                  <span>Điện thoại: </span>
                  {footerData.phone}
                </p>
              </li>
              <li>
                <p>
                  <span>Email: </span>
                  {footerData.email}
                </p>
              </li>
            </ul>
          </div>

          <FooterColumn title="CHÍNH SÁCH" links={policies} />
          <FooterColumn title="HỖ TRỢ KHÁCH HÀNG" links={customerSupport} />
          {/* Cột Đăng ký nhận tin */}
          <div>
            <h3 className="mb-4 text-base font-bold">ĐĂNG KÝ NHẬN TIN</h3>
            <form className="relative mt-2 h-[45px] w-full rounded-full border border-black bg-white px-4">
              <input type="hidden" value="Customer" />
              <input
                type="email"
                name="email"
                aria-label="Nhập địa chỉ email"
                placeholder="Nhập địa chỉ email"
                className="h-full w-full text-gray-500 outline-none"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
              <button
                type="submit"
                className="absolute top-1 right-1 bottom-1 rounded-full bg-black px-3 text-white"
              >
                Đăng ký
              </button>
            </form>
            {/* Mạng xã hội */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
              {Object.entries(footerData.social).map(([key, url]) => (
                <Link
                  key={key}
                  href={url}
                  target="_blank"
                  title={`Theo dõi ${key} EGA Men Style`}
                >
                  <Image
                    src={`/images/${key}.png`}
                    alt={key}
                    width={32}
                    height={32}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-4 flex items-center justify-center">
          <Image
            src="/images/footer_trustbadge.png"
            alt="Phương thức thanh toán"
            width={301}
            height={36}
          />
        </div>

        {/* Bản quyền */}
        <div className="mt-2 w-full border-t border-[var(--footer-border)] pt-2">
          <p className="text-center">
            © Bản quyền thuộc về{" "}
            <Link
              className="text-[var(--link-color)] hover:opacity-75"
              href="https://egany.com/"
            >
              EGANY
            </Link>{" "}
            | Cung cấp bởi{" "}
            <Link className="text-[var(--link-color)] hover:opacity-75" href="">
              Haravan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
