"use client";

import { useRouter, redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@/context/UserContext";

export default function Header() {
  const pathname = usePathname();
  const { user, setUser, isAuthenticated, setIsAuthenticated, loading } =
    useUser();

  const headerMenu = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Sản phẩm",
      href: "/collections/all",
      subMenu: [],
    },
    {
      title: "Chương trình khuyến mãi",
      href: "/collections/all",
      subMenu: [],
    },
    {
      title: "Hệ thống cửa hàng",
      href: "/pages/danh-sach-cua-hang",
    },
    {
      title: "Giới thiệu",
      href: "/pages/gioi-thieu",
    },
    {
      title: "Tin tức",
      href: "/pages/tin-tuc",
    },
    {
      title: "Liên hệ",
      href: "/pages/lien-he",
    },
    {
      title: "Kiểm tra đơn hàng",
      href: "/pages/kiem-tra-don-hang",
    },
  ];

  const [translateHeader, setTranslateHeader] = useState("translate-y-0");
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const countWishlist = 0;
  const countCart = 0;

  const handleClickRight = () => {
    setTranslateHeader("-translate-y-full");
  };

  const handleClickLeft = () => {
    setTranslateHeader("translate-y-0");
  };

  const handleClickMenuMobile = () => {
    setOpenMenuMobile(true);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      redirect("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
    setOpenMenuMobile(false);
  };

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === href) {
      e.preventDefault();
    }
    setOpenMenuMobile(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setOpenMenuMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpenMenuMobile(false);
  }, [pathname]);

  if (loading) return null;

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-white">
        <div className="container grid h-[65px] grid-cols-[150px_1fr_150px] items-center gap-[15px] max-[991px]:px-0 max-[991px]:py-[15px] max-[767px]:grid-cols-[1fr_1.5fr_1fr]">
          <div
            className="min-[992px]:mr-[10px] min-[992px]:hidden"
            onClick={handleClickMenuMobile}
          >
            <Image src="/svg/list.svg" alt="menu" width={32} height={32} />
          </div>
          <Link
            href="/"
            className="max-[991px]:flex max-[991px]:items-center max-[991px]:justify-center"
          >
            <Image
              className="h-auto max-w-full"
              src="/images/logo.png"
              alt="logo"
              width={134}
              height={46}
              priority
            />
          </Link>
          <div className="[position:initial] hidden w-full items-center justify-center min-[992px]:flex">
            <div className="max-h-[65px] overflow-hidden">
              <nav className="block">
                <ul className="flex min-h-full w-full max-w-full flex-row flex-wrap overflow-x-auto">
                  {headerMenu.map((item, index) => (
                    <li
                      key={index}
                      className="group [position:initial] border-b-0 bg-transparent p-0"
                    >
                      <Link
                        href={item.href}
                        title={item.title}
                        className={`header-menu-item relative flex items-center px-[15px] py-[20px] whitespace-nowrap no-underline ${translateHeader}`}
                      >
                        <span>{item.title}</span>
                        {item?.subMenu && (
                          <span className="ml-[5px] transition-transform duration-200 group-hover:-rotate-180">
                            <Image
                              src="/svg/arrowdown.svg"
                              alt="arrow-down"
                              width={16}
                              height={16}
                            />
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex items-center">
              <span
                className={`flex h-10 w-10 rotate-90 cursor-pointer items-center justify-center hover:rounded-full hover:bg-gray-200 ${
                  translateHeader === "translate-y-0" ? "disabled" : ""
                }`}
                onClick={
                  translateHeader === "translate-y-0"
                    ? () => {}
                    : handleClickLeft
                }
              >
                <Image
                  src="/svg/arrowdown.svg"
                  alt="arrow-down"
                  width={20}
                  height={20}
                />
              </span>
              <span
                className={`flex h-10 w-10 -rotate-90 cursor-pointer items-center justify-center hover:rounded-full hover:bg-gray-200 ${
                  translateHeader === "-translate-y-full" ? "disabled" : ""
                }`}
                onClick={
                  translateHeader === "-translate-y-full"
                    ? () => {}
                    : handleClickRight
                }
              >
                <Image
                  src="/svg/arrowdown.svg"
                  alt="arrow-down"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-end gap-2 md:gap-3.5">
              <span className="cursor-pointer" title="Tìm kiếm">
                <Image
                  src="/svg/search.svg"
                  alt="search"
                  width={24}
                  height={24}
                />
              </span>
              <Link
                href={isAuthenticated ? "/account" : "/account/login"}
                className="max-[767px]:hidden"
                title="Tài khoản"
              >
                <div className="text-[32px]">
                  <Image
                    src="/svg/user.svg"
                    alt="user"
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
              <Link href="/pages/wishlist" title="Sản phẩm yêu thích">
                <span className="relative">
                  <Image
                    src="/svg/heart.svg"
                    alt="heart"
                    width={24}
                    height={24}
                  />
                  <span className="absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full bg-[#da3f3f] text-center text-[10px] text-white">
                    {countWishlist}
                  </span>
                </span>
              </Link>
              <Link href="/pages/cart" title="Giỏ hàng">
                <span className="relative">
                  <Image
                    src="/svg/cart.svg"
                    alt="cart"
                    width={24}
                    height={24}
                  />
                  <span className="absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full bg-[#da3f3f] text-center text-[10px] text-white">
                    {countCart}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu for mobile */}
        <div
          className={`fixed top-0 left-0 z-[9999] h-full w-[300px] overflow-y-auto bg-white transition-transform duration-300 ${openMenuMobile ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center bg-[var(--primary-color)] p-[10px_15px] text-white">
            <Image
              src="/svg/account.svg"
              alt="account"
              width={42}
              height={42}
            />
            <div className="ml-[10px] flex flex-col">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="font-bold"
                    onClick={(e) => handleMenuClick(e, "/account")}
                  >
                    {`${user?.firstName} ${user?.lastName}`}
                  </Link>
                  <Link
                    href="/"
                    onClick={handleLogout}
                    className="text-[80%] font-normal"
                  >
                    Đăng xuất
                  </Link>
                </>
              ) : (
                <>
                  <span>Tài khoản</span>
                  <Link
                    href="/account/login"
                    className="text-[80%] font-normal"
                    onClick={(e) => handleMenuClick(e, "/account/login")}
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="overflow-y-auto">
            <nav className="block">
              <ul className="max-h-auto flex w-full max-w-full flex-col flex-wrap overflow-x-auto">
                {headerMenu.map((item, index) => (
                  <li
                    key={index}
                    className="[position:initial] border-b-0 bg-transparent p-0"
                  >
                    <Link
                      href={item.href}
                      title={item.title}
                      className="relative flex items-center justify-between p-[10px_15px] whitespace-nowrap"
                      onClick={(e) => handleMenuClick(e, item.href)}
                    >
                      <span>{item.title}</span>
                      {item?.subMenu && (
                        <span className="ml-[5px] -rotate-90">
                          <Image
                            src="/svg/arrowdown.svg"
                            alt="arrow-down"
                            width={16}
                            height={16}
                          />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 flex w-full items-center bg-[#f4f4f4] text-center">
            <div className="w-1/2 p-2">
              <Link
                href="tel:19001393"
                title="19001393"
                className="flex items-center justify-center gap-1.5 text-sky-600"
                onClick={() => setOpenMenuMobile(false)}
              >
                <span>Gọi điện</span>
                <Image
                  src="/svg/phone.svg"
                  alt="phone"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
            <div className="w-1/2 border-l border-[#dee2e6] p-2">
              <Link
                href="tel:19001393"
                title="19001393"
                className="flex items-center justify-center gap-1.5 text-sky-600"
                onClick={() => setOpenMenuMobile(false)}
              >
                <span>Nhắn tin</span>
                <Image
                  src="/svg/messenger.svg"
                  alt="messenger"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Menu overlay */}
        <div
          className={`fixed top-0 left-0 z-[1000] h-full w-full bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 ${
            openMenuMobile ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpenMenuMobile(false)}
        />
      </header>
    </>
  );
}
