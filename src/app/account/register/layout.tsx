import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo tài khoản",
  description: "Trang tạo tài khoản mới.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
