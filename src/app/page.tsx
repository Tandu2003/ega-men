"use client";

import CouponList from "@/components/CouponList";
import Loading from "@/components/Loading";
import Policy from "@/components/Policy";
import ProductCategories from "@/components/ProductCategories";
import SwiperSlider from "@/components/SwiperSlider";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { loading } = useUser();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="page-home">
          <SwiperSlider />
          <Policy />
          <ProductCategories />
          <CouponList />
        </main>
      )}
    </>
  );
}
