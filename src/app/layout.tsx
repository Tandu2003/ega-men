import type { Metadata } from "next";

import "@/styles/globals.css";

import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import { UserProvider } from "@/context/UserContext";

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
        <UserProvider>
          <TopBar />
          <Header />
          {children}
          <Footer />
        </UserProvider>
        <FloatingButtons />
      </body>
    </html>
  );
}
