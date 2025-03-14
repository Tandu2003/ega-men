"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function RegisterPage() {
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === "last_name") setLastName(value);
    if (name === "first_name") setFirstName(value);
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(last_name, first_name, phone, email, password);
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Đăng nhập" }]} />
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
              <div className="page-login">
                <div id="login">
                  <form method="post" onSubmit={handleRegister}>
                    <h2 className="mt-[15px] mb-5 text-center text-lg uppercase">
                      Thông tin cá nhân
                    </h2>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="last_name">
                        Họ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="last_name"
                        name="last_name"
                        placeholder="Họ"
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="first_name">
                        Tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                        id="first_name"
                        name="first_name"
                        placeholder="Tên"
                        onChange={handleOnChange}
                        required
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
                        onChange={handleOnChange}
                        required
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
                        onChange={handleOnChange}
                        required
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
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="mt-2 w-full">
                      <button
                        type="submit"
                        className="btn w-full cursor-pointer rounded-[3px] bg-black text-xl text-white"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
