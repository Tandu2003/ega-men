import type { Metadata } from "next";

import "@/styles/globals.css";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EGA Men Style",
  description:
    "EGA Men Style - Thương hiệu thời trang nam với các sản phẩm áo khoác, áo sơ mi, áo thun, quần jeans, quần short chất lượng cao. Miễn phí vận chuyển, ưu đãi hấp dẫn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black" cz-shortcut-listen="true">
        <TopBar />
        <Header />
        {children}
      </body>
    </html>
  );
}
