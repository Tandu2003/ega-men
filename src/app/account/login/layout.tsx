import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản",
  description: "Trang đăng nhập và quên mật khẩu.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
