"use client";

import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useUser } from "@/context/UserContext";

interface HeaderMenu {
  title: string;
  href: string;
  subMenu?: HeaderSubMenu[];
}

interface HeaderSubMenu {
  title: string;
  href: string;
  items?: HeaderSubMenuItems[];
}

interface HeaderSubMenuItems {
  title: string;
  href: string;
}

export default function Header() {
  const pathname = usePathname();
  const { user, setUser, isAuthenticated, setIsAuthenticated, loading } =
    useUser();

  const headerMenu: HeaderMenu[] = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Sản phẩm",
      href: "/collections/all",
      subMenu: [
        {
          title: "Bộ sưu tập",
          href: "/collections/all",
          items: [
            {
              title: "Áo khoác",
              href: "/collections/ao-khoac",
            },
            {
              title: "Áo sơ mi",
              href: "/collections/ao-so-mi",
            },
            {
              title: "Áo thun",
              href: "/collections/ao-thun",
            },
            {
              title: "Quần dài",
              href: "/collections/quan-dai",
            },
            {
              title: "Quần jeans",
              href: "/collections/quan-jeans",
            },
            {
              title: "Quần short",
              href: "/collections/quan-short",
            },
          ],
        },
        {
          title: "Mặc theo dịp",
          href: "/collections/all",
          items: [
            {
              title: "Dạo phố",
              href: "/collections/dao-pho",
            },
            {
              title: "Đi biển",
              href: "/collections/di-bien",
            },
            {
              title: "Du lịch",
              href: "/collections/du-lich",
            },
            {
              title: "Đi chơi",
              href: "/collections/di-choi",
            },
          ],
        },
        {
          title: "Áo nam thời trang",
          href: "/collections/hot-products",
          items: [
            {
              title: "Áo thể thao",
              href: "/collections/ao-the-thao",
            },
            {
              title: "Áo sơ mi",
              href: "/collections/ao-so-mi",
            },
            {
              title: "Áo khoác",
              href: "/collections/ao-khoac",
            },
            {
              title: "Áo thun",
              href: "/collections/ao-thun",
            },
          ],
        },
        {
          title: "Đồ mặc nhà",
          href: "/collections/hot-products",
          items: [
            {
              title: "Đồ dài",
              href: "/collections/do-dai",
            },
            {
              title: "Đồ ngắn",
              href: "/collections/do-ngan",
            },
            {
              title: "Đồ xuân - hè",
              href: "/collections/do-xuan-he",
            },
            {
              title: "Đồ thu - đông",
              href: "/collections/do-thu-dong",
            },
          ],
        },
      ],
    },
    {
      title: "Chương trình khuyến mãi",
      href: "/collections/all",
      subMenu: [
        {
          title: "Landing Page - XMas",
          href: "/pages/landing-page-xmas",
        },
        {
          title: "Landing Page - Black Friday",
          href: "/pages/landing-page-black-friday",
        },
        {
          title: "Landing Page - OnePage",
          href: "/pages/landing-page-onepage",
        },
        {
          title: "Landing Page - Flash Sale",
          href: "/pages/landing-page-flash-sale",
        },
      ],
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: number]: boolean }>(
    {},
  );

  const menuRefs = useRef<{ [key: number]: HTMLUListElement | null }>({});
  const subMenuRefs = useRef<{ [key: number]: HTMLUListElement | null }>({});

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

  const toggleDropdown = () => {
    if (!hasMouse) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const menuVariants = {
    open: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3 } },
  };

  const subMenuVariants = {
    open: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3 } },
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
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasMouse(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        document.querySelector("header")?.classList.add("shadow-md");
      } else {
        document.querySelector("header")?.classList.remove("shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [hasMouse]);

  useEffect(() => {
    if (openMenuMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openMenuMobile]);

  const toggleMenu = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    e.preventDefault();
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubMenu = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number,
  ) => {
    e.preventDefault();
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    interface Refs {
      current: { [key: number]: HTMLUListElement | null };
    }

    interface State {
      [key: number]: boolean;
    }

    const updateHeight = (refs: Refs, state: State) => {
      Object.keys(refs.current).forEach((key) => {
        const menu = refs.current[Number(key)];
        if (menu) {
          const isOpen = state[Number(key)];
          let totalHeight = isOpen ? menu.scrollHeight : 0;

          // Nếu có submenu mở, cộng thêm chiều cao của nó
          const subMenus = menu.querySelectorAll("ul");
          subMenus.forEach((sub) => {
            if (sub.scrollHeight) {
              totalHeight += sub.scrollHeight;
            }
          });

          menu.style.maxHeight = isOpen ? `${totalHeight}px` : "0px";
        }
      });
    };

    updateHeight(menuRefs, openMenus);
    updateHeight(subMenuRefs, openSubMenus);
  }, [openMenus, openSubMenus]);

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
                        onClick={(e) => handleMenuClick(e, item.href)}
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
                      {item?.subMenu && (
                        <div
                          className={`pointer-events-none absolute top-[calc(100%-2.5px)] z-[1000] border-t border-[#f1f1f1] bg-white p-[14px_20px] opacity-0 shadow-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${
                            item.subMenu.some(
                              (subItem) => subItem.items?.length,
                            )
                              ? "left-0 h-80 w-full"
                              : "left-[initial] h-auto w-80"
                          }`}
                        >
                          <div className="container">
                            <ul
                              className={`grid gap-[5px] ${
                                item.subMenu.some(
                                  (subItem) => subItem.items?.length,
                                )
                                  ? "grid-cols-4"
                                  : "grid-cols-1"
                              }`}
                            >
                              {item.subMenu.map((subItem, subIndex) => (
                                <li key={subIndex} className="flex flex-col">
                                  <Link
                                    href={subItem.href}
                                    title={subItem.title}
                                    className={`mb-1 hover:text-[var(--link-color)] ${
                                      subItem.items?.length
                                        ? "font-bold"
                                        : "font-normal"
                                    }`}
                                    onClick={(e) =>
                                      handleMenuClick(e, subItem.href)
                                    }
                                  >
                                    {subItem.title}
                                  </Link>
                                  {subItem?.items && (
                                    <>
                                      {subItem.items.map(
                                        (subMenuItem, subMenuItemIndex) => (
                                          <Link
                                            key={subMenuItemIndex}
                                            href={subMenuItem.href}
                                            title={subMenuItem.title}
                                            className="mb-1 text-[#666666] hover:text-[var(--link-color)]"
                                            onClick={(e) =>
                                              handleMenuClick(
                                                e,
                                                subMenuItem.href,
                                              )
                                            }
                                          >
                                            {subMenuItem.title}
                                          </Link>
                                        ),
                                      )}
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
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
              <div
                className="group relative cursor-pointer max-[767px]:hidden"
                title="Tài khoản"
                onClick={toggleDropdown}
              >
                <div className="text-[32px]">
                  <Image
                    src="/svg/user.svg"
                    alt="user"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`dropdown-account pointer-events-none absolute top-[calc(100%+10px)] left-1/2 w-[95px] -translate-x-1/2 rounded-[5px] bg-[#333] text-white transition-all duration-300 ${
                      hasMouse
                        ? "opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                        : isDropdownOpen
                          ? "pointer-events-auto opacity-100"
                          : "opacity-0"
                    }`}
                  >
                    {loading ? null : (
                      <>
                        {isAuthenticated ? (
                          <>
                            <Link
                              href="/account"
                              className="block p-[7px_8px] text-[14px] hover:rounded-[5px] hover:bg-[#666]"
                              onClick={(e) => handleMenuClick(e, "/account")}
                            >
                              Tài khoản
                            </Link>
                            <Link
                              href="/account/logout"
                              className="block p-[7px_8px] text-[14px] hover:rounded-[5px] hover:bg-[#666]"
                              onClick={handleLogout}
                            >
                              Đăng xuất
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/account/login"
                              className="block p-[7px_8px] text-[14px] hover:rounded-[5px] hover:bg-[#666]"
                              onClick={(e) =>
                                handleMenuClick(e, "/account/login")
                              }
                            >
                              Đăng nhập
                            </Link>
                            <Link
                              href="/account/register"
                              className="block p-[7px_8px] text-[14px] hover:rounded-[5px] hover:bg-[#666]"
                              onClick={(e) =>
                                handleMenuClick(e, "/account/register")
                              }
                            >
                              Đăng ký
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
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
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: openMenuMobile ? "0" : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 z-[9999] h-full w-[300px] bg-white shadow-lg"
        >
          <div className="flex items-center bg-[var(--primary-color)] p-[10px_15px] text-white">
            <Image
              src="/svg/account.svg"
              alt="account"
              width={42}
              height={42}
            />
            <div className="ml-2.5 flex flex-col">
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
          <div className="max-h-[calc(100%-68px)] overflow-y-auto">
            <nav className="block">
              <ul className="max-h-auto flex w-full max-w-full flex-col flex-wrap overflow-x-auto">
                {headerMenu.map((item, index) => (
                  <li
                    key={index}
                    className="[position:initial] border-b-0 bg-transparent p-0"
                  >
                    <span className="relative flex w-full items-center justify-between p-[10px_15px] whitespace-nowrap">
                      <Link
                        href={item.href}
                        title={item.title}
                        onClick={(e) => handleMenuClick(e, item.href)}
                        className="w-full text-left"
                      >
                        {item.title}
                      </Link>
                      {item?.subMenu && (
                        <span
                          className={`ml-[5px] transition-transform duration-300 ${openMenus[index] ? "rotate-0" : "-rotate-90"}`}
                          onClick={(e) => toggleMenu(e, index)}
                        >
                          <Image
                            src="/svg/arrowdown.svg"
                            alt="arrow-down"
                            width={16}
                            height={16}
                          />
                        </span>
                      )}
                    </span>
                    {item?.subMenu && (
                      <motion.ul
                        variants={menuVariants}
                        initial="closed"
                        animate={openMenus[index] ? "open" : "closed"}
                        className="overflow-hidden"
                      >
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="flex flex-col">
                            <span className="flex items-center justify-between p-[10px_15px] hover:text-[var(--link-color)]">
                              <Link
                                href={subItem.href}
                                title={subItem.title}
                                onClick={(e) =>
                                  handleMenuClick(e, subItem.href)
                                }
                                className="w-full text-left"
                              >
                                {subItem.title}
                              </Link>
                              {subItem?.items && (
                                <span
                                  className={`ml-[5px] transition-transform duration-300 ${openSubMenus[subIndex] ? "rotate-0" : "-rotate-90"}`}
                                  onClick={(e) => toggleSubMenu(e, subIndex)}
                                >
                                  <Image
                                    src="/svg/arrowdown.svg"
                                    alt="arrow-down"
                                    width={16}
                                    height={16}
                                  />
                                </span>
                              )}
                            </span>
                            {subItem?.items && (
                              <motion.ul
                                variants={subMenuVariants}
                                initial="closed"
                                animate={
                                  openSubMenus[subIndex] ? "open" : "closed"
                                }
                                className="overflow-hidden"
                              >
                                {subItem.items.map(
                                  (subMenuItem, subMenuItemIndex) => (
                                    <li key={subMenuItemIndex} className="flex">
                                      <Link
                                        href={subMenuItem.href}
                                        title={subMenuItem.title}
                                        onClick={(e) =>
                                          handleMenuClick(e, subMenuItem.href)
                                        }
                                        className="p-[10px_15px] hover:text-[var(--link-color)]"
                                      >
                                        {subMenuItem.title}
                                      </Link>
                                    </li>
                                  ),
                                )}
                              </motion.ul>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
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
                  className=""
                />
              </Link>
            </div>
          </div>
        </motion.div>

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
