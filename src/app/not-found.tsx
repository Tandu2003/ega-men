import { Metadata } from "next";

import NotFound from "@/components/NotFound";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang không tồn tại hoặc đã bị xóa.",
};

export default function Page404() {
  return (
    <>
      <NotFound />
    </>
  );
}
