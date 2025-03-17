"use client";
 
 import Image from "next/image";
 import { useState } from "react";
 
 interface CouponItemProps {
   image: string;
   code: string;
   condition: string[];
 }
 
 export default function CouponItem({ coupon }: { coupon: CouponItemProps }) {
   const { image, code, condition } = coupon;
 
   const [text, setText] = useState("Sao chép");
 
   const handleCopy = () => {
     navigator.clipboard.writeText(code);
     setText("Đã sao chép");
 
     setTimeout(() => {
       setText("Sao chép");
     }, 1500);
   };
 
   const handleCondition = () => {
     console.log("Điều kiện");
   };
 
   return (
     <>
       <div className="flex h-full min-h-25 flex-1 items-center justify-between bg-white drop-shadow-[0px_0px_3px_rgba(0,0,0,0.15)]">
         <div className="py-2 pr-1 pl-2 text-center">
           <Image src={image} alt="coupon" width={79} height={70} />
         </div>
         <div className="flex w-full flex-col px-4 py-3">
           <div className="pb-5">
             <h5 className="mb-2.5 text-base font-bold text-[var(--coupon-title-color)] uppercase">
               Nhập mã: <span>{code}</span>
             </h5>
 
             <p className="text-sm text-gray-500">{condition[0]}</p>
           </div>
           <div className="flex items-center justify-between">
             <button
               className="mb-1 bg-[var(--coupon-button-color)] p-[2px_8px_3px_8px] text-white"
               onClick={handleCopy}
             >
               {text}
             </button>
             <span
               className="mb-1 ml-2.5 cursor-pointer text-sm text-[#353945] underline"
               onClick={handleCondition}
             >
               Điều kiện
             </span>
           </div>
         </div>
       </div>
     </>
   );
 }