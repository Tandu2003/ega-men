"use client";

import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email, password);
  };

  const handleRecoverPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: "Đăng nhập" }]} />
      <section className="section section-login">
        <div className="container p-[15px]">
          <div className="bg-white pt-[5px] pb-2.5 text-center text-base">
            <h1 className="py-2.5 text-2xl font-normal uppercase">
              Đăng nhập tài khoản
            </h1>
            <p>
              Bạn chưa có tài khoản ?{" "}
              <Link
                href="/account/register"
                className="text-[var(--link-color)] underline"
              >
                Đăng ký tại đây
              </Link>
            </p>
          </div>
          <div className="row">
            <div className="m-auto w-full p-[15px] md:w-1/2 lg:w-5/12">
              <div className="page-login">
                {isLogin ? (
                  <div id="login">
                    <form method="post" onSubmit={handleLogin}>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email">
                          Email
                          <span className="text-red-500">*</span>
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
                          Mật khẩu
                          <span className="text-red-500">*</span>
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
                      <p>
                        Quên mật khẩu? Nhấn vào{" "}
                        <Link
                          href=""
                          className="text-[var(--link-color)] hover:opacity-75"
                          onClick={(e) => setIsLogin(false)}
                        >
                          đây
                        </Link>
                      </p>
                      <div className="mt-2 w-full">
                        <button
                          type="submit"
                          className="btn w-full cursor-pointer rounded-[3px] bg-black text-xl text-white"
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div id="recover-password">
                    <form method="post" onSubmit={handleRecoverPassword}>
                      <h2 className="mt-[15px] mb-5 text-center text-lg uppercase">
                        Đặt lại mật khẩu
                      </h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="mb-2">
                          Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc
                          đặt lại mật khẩu.
                        </label>
                        <input
                          type="email"
                          className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                          id="email"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <button
                          type="submit"
                          className="btn w-full cursor-pointer rounded-[3px] bg-black text-xl text-white"
                        >
                          Gửi yêu cầu
                        </button>
                      </div>
                      <p
                        className="mt-2 w-full cursor-pointer text-center hover:text-[var(--link-color)]"
                        onClick={() => setIsLogin(true)}
                      >
                        Quay lại
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
