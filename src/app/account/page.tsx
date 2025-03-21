"use client";

import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Breadcrumb from "@/components/Breadcrumb";
import { useUser } from "@/context/UserContext";

import axios from "axios";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser, isAuthenticated, setIsAuthenticated, loading } =
    useUser();
  const [checking, setChecking] = useState(true);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/logout");
      redirect("/");
    } catch (error) {
      console.error("Error logging out", error);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        redirect("/account/login");
      } else {
        setChecking(false);
      }
    }
  }, [isAuthenticated, loading]);

  if (checking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb items={[{ label: "Tài khoản" }]} />
      <section className="section page-account">
        <div className="container p-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="sticky top-4 flex flex-col border-b-[10px] border-b-[#f4f4f4] pb-5 md:mr-5 md:border-r-2 md:border-b-0 md:border-r-[#f4f4f4] md:pb-0"
            >
              <h5 className="mb-4 text-xl font-normal text-[#212b25] uppercase">
                Trang tài khoản
              </h5>
              <p className="relative mb-4 text-lg leading-4 font-bold text-[#212b25]">
                Xin chào, {user?.firstName} {user?.lastName}!
              </p>
              <ul>
                <li>
                  <Link
                    href="/account"
                    className="mb-5 block text-sm font-normal text-[#212b25]"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/orders"
                    className="mb-5 block text-sm font-normal text-[#212b25]"
                  >
                    Đơn hàng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/addresses"
                    className="mb-5 block text-sm font-normal text-[#212b25]"
                  >
                    Địa chỉ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/logout"
                    onClick={handleLogout}
                    className="text-[var(--link-color)]"
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col pt-5 md:mx-5 md:pt-0"
            >
              <div className="">
                <h5 className="text-2xl font-normal uppercase">Tài khoản</h5>
                <p className="mt-5">
                  Tên tài khoản:{" "}
                  <strong>
                    {user?.firstName} {user?.lastName}
                  </strong>
                </p>
                <p className="mt-2">
                  Email: <strong>{user?.email}</strong>
                </p>
                <p className="mt-2">
                  Số điện thoại: <strong>{user?.phone}</strong>
                </p>
                <p className="mt-2">
                  Địa chỉ: <strong>{user?.address || "Việt Nam"}</strong>
                </p>
              </div>
              <div className="mt-10">
                <h5 className="text-2xl font-normal uppercase">
                  Đơn hàng của bạn
                </h5>
                <p className="mt-5">
                  Bạn chưa có đơn hàng nào.{" "}
                  <Link href="/" className="text-[var(--link-color)] underline">
                    Mua hàng ngay
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
