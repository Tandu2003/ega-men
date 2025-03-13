"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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

  return (
    <footer>
      <div className="bg-[var(--footer-bg)] text-[15px] text-[var(--footer-color)]">
        <div className="container pt-4 pb-2">
          <div className="lg:row">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="">
                <Image
                  src={footerData.logo}
                  alt="logo-footer"
                  width={164}
                  height={50}
                />
                <ul>
                  <li className="mt-2.5">
                    <p>
                      <span>Adress: </span>
                      {footerData.address}
                    </p>
                  </li>
                  <li className="mt-2.5">
                    <p>
                      <span>Phone: </span>
                      {footerData.phone}
                    </p>
                  </li>
                  <li className="mt-2.5">
                    <p>
                      <span>Email: </span>
                      {footerData.email}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="">
                <ul>
                  <li className="mt-2.5">
                    <h3 className="mb-4 text-base font-bold">CHÍNH SÁCH</h3>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/about-us">Giới thiệu</Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/danh-sach-cua-hang">
                      Danh sách cửa hàng
                    </Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/cau-hoi-thuong-gap">
                      Câu hỏi thường gặp
                    </Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/goi-dien-dat-hang">
                      Gọi điện đặt hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <ul>
                  <li className="mt-2.5">
                    <h3 className="mb-4 text-base font-bold">
                      HỖ TRỢ KHÁCH HÀNG
                    </h3>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/lien-he">Liên hệ</Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/chinh-sach-ban-hang">
                      Chính sách bán hàng
                    </Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/chinh-sach-giao-hang">
                      Chính sách giao hàng
                    </Link>
                  </li>
                  <li className="mt-2.5">
                    <Link href="/pages/chinh-sach-doi-tra">
                      Chính sách đổi trả
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h3 className="mt-2.5 mb-4 text-base font-bold">
                  ĐĂNG KÝ NHẬN TIN
                </h3>
                <form
                  method="post"
                  className="relative mt-2 h-[45px] w-full rounded-full border-[1px] border-black bg-white px-4"
                >
                  <input type="hidden" value="Customer" />
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    className="h-full w-full text-gray-500 outline-none"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                  <button
                    type="submit"
                    className="absolute top-[1px] right-[1px] bottom-[1px] rounded-full bg-black px-3 text-white"
                  >
                    Đăng ký
                  </button>
                </form>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                  {(
                    Object.keys(footerData.social) as Array<
                      keyof typeof footerData.social
                    >
                  ).map((key) => (
                    <Link
                      key={key}
                      className="flex h-[45px] items-center gap-[15px] rounded-[6px] p-[5px_3px] leading-[33px]"
                      href={footerData.social[key]}
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
            <div className="mt-4 flex items-center justify-center">
              <Image
                src="/images/footer_trustbadge.png"
                alt="Phương thức thanh toán"
                width={301}
                height={36}
              />
            </div>
            <div className="mt-2 w-full gap-2.5 border-t-[1px] border-[var(--footer-border)] pt-2">
              <p className="text-center">
                © Bản quyền thuộc về{" "}
                <Link
                  className="text-[var(--link-color)] hover:opacity-75"
                  href="https://egany.com/"
                >
                  EGANY
                </Link>{" "}
                | Cung cấp bởi{" "}
                <Link
                  className="text-[var(--link-color)] hover:opacity-75"
                  href=""
                >
                  Haravan
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
