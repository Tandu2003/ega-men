"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumb";

import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverEmail, setRecoverEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "recover_email") setRecoverEmail(value);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password) {
      setError(true);
      setMessage("Email hoặc mật khẩu không được để trống.");
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

    // Gửi request đăng nhập tại đây
    const data = { email, password };

    try {
      const response = await axios.post("/api/auth/login", data);
      setError(false);
      setMessage(response.data.message);
    } catch (error: any) {
      setError(true);
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi.");
      return;
    }

    // Nếu đăng nhập thành công, chuyển hướng tới trang chủ
    redirect("/");
  };

  const handleRecoverPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!recoverEmail) {
      setError(true);
      setMessage("Email không được để trống.");
      return;
    }

    if (!emailRegex.test(recoverEmail)) {
      setError(true);
      setMessage("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    // Nếu gửi yêu cầu thành công
    setError(false);
    setMessage("Loading...");

    // Gửi request đặt lại mật khẩu tại đây
    console.log("Đặt lại mật khẩu với:", { recoverEmail });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setEmail("");
    setPassword("");
    setRecoverEmail("");
    setError(false);
    setMessage("");
  }, [isLogin]);

  useEffect(() => {
    if (window.location.hash === "#recover") {
      setIsLogin(false);
    }
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
                          Đăng nhập
                        </button>
                      </div>
                      {message && (
                        <p
                          className={`${error ? "text-left text-red-500" : "text-center text-black"}`}
                        >
                          {message}
                        </p>
                      )}
                      <div className="w-full text-right">
                        <Link
                          href=""
                          className="text-[var(--link-color)] hover:opacity-75"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(false);
                          }}
                        >
                          Quên mật khẩu?
                        </Link>
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
                        <label htmlFor="recover_email" className="mb-2">
                          Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc
                          đặt lại mật khẩu.
                        </label>
                        <input
                          type="recover_email"
                          className="mb-2 h-10 rounded-[3px] border-[1px] border-[#e1e1e1] px-5 leading-10"
                          id="recover_email"
                          name="recover_email"
                          defaultValue={recoverEmail}
                          onChange={handleOnChange}
                          placeholder="Email"
                        />
                      </div>
                      <div className="mt-2 mb-2 w-full">
                        <button
                          type="submit"
                          className="btn w-full cursor-pointer rounded-[3px] bg-black text-xl text-white"
                        >
                          Gửi yêu cầu
                        </button>
                      </div>
                      {message && (
                        <p
                          className={`${error ? "text-left text-red-500" : "text-center text-black"}`}
                        >
                          {message}
                        </p>
                      )}
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
