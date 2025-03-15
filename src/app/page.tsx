"use client";

import Loading from "@/components/Loading";
import Policy from "@/components/Policy";
import SlickSlider from "@/components/SlickSlider";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { loading } = useUser();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="page-home">
          <SlickSlider />
          <Policy />
        </main>
      )}
    </>
  );
}
