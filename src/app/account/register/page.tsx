"use client";

import { useRouter, redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Breadcrumb from "@/components/Breadcrumb";
import { useUser } from "@/context/UserContext";

import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useUser();
  const [checking, setChecking] = useState(true);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "lastName") setLastName(value);
    if (name === "firstName") setFirstName(value);
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameRegex =
      /^[A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s[A-ZÀ-Ỹ][a-zà-ỹ]+)*(?:-[A-ZÀ-Ỹ][a-zà-ỹ]+)*$/;
    const phoneRegex = /^(0[235789])(\d{8})$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!lastName || !firstName || !phone || !email || !password) {
      setError(true);
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      setError(true);
      setMessage("Họ không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    if (!nameRegex.test(firstName)) {
      setError(true);
      setMessage("Tên không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError(true);
      setMessage("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError(true);
      setMessage("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(true);
      setMessage(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
      );
      return;
    }

    setError(false);
    setMessage("Loading...");

    // Gửi request đăng ký tài khoản tại đây
    const data = {
      lastName,
      firstName,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post("/api/auth/register", data);
      setError(false);
      setResetLink("");
      setMessage(response.data.message);
    } catch (error: any) {
      setError(true);
      setResetLink(error.response?.data?.resetLink || "");
      setMessage(error.response?.data?.message || "Đã có lỗi xảy ra.");
      return;
    }

    // Nếu đăng ký thành công, hiển thị thông báo và chuyển hướng về trang đăng nhập
    setTimeout(() => {
      redirect("/account/login");
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        redirect("/account");
      } else {
        setChecking(false);
      }
    }
  }, [isAuthenticated, loading]);

  if (checking) return null;

  return (
    <>
      <Breadcrumb items={[{ label: "Đăng ký" }]} />
      <section className="section section-login">
        <div className="container p-[15px]">
          <div className="bg-white pt-[5px] pb-2.5 text-center text-base">
            <h1 className="py-2.5 text-2xl font-normal uppercase">
              Đăng ký tài khoản
            </h1>
            <p>
              Bạn đã có tài khoản ?{" "}
              <Link
                href="/account/login"
                className="text-[var(--link-color)] underline"
              >
                Đăng nhập tại đây
              </Link>
            </p>
          </div>
          <div className="row">
            <div className="m-auto w-full p-[15px] md:w-1/2 lg:w-5/12">
              <div className="page-register">
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <form method="post" onSubmit={handleRegister}>
                    <h2 className="mt-[15px] mb-5 text-center text-lg uppercase">
                      Thông tin cá nhân
                    </h2>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName">
                        Họ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="lastName"
                        name="lastName"
                        placeholder="Họ"
                        defaultValue={lastName}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstName">
                        Tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="firstName"
                        name="firstName"
                        placeholder="Tên"
                        defaultValue={firstName}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        defaultValue={phone}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={email}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        defaultValue={password}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="mt-2 mb-2 w-full">
                      <button
                        type="submit"
                        className="btn w-full cursor-pointer rounded-[3px] bg-black text-xl text-white"
                      >
                        Đăng ký
                      </button>
                    </div>
                    {message && (
                      <p
                        className={`${error ? "text-left text-red-500" : "text-center text-black"}`}
                      >
                        {message}{" "}
                        {resetLink && (
                          <Link
                            href={resetLink}
                            className="text-[var(--link-color)]"
                          >
                            tại đây.
                          </Link>
                        )}
                      </p>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
