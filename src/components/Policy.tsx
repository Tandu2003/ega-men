import Image from "next/image";

export default function Policy() {
  return (
    <>
      <section className="section section-policy">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center gap-2.5 space-x-4 lg:flex-row">
              <Image
                src="/images/policies_icon_1.png"
                alt="Policy 1"
                width={40}
                height={40}
              />
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-bold lg:mb-[5px] lg:text-base">
                  Miễn phí vận chuyển
                </h3>
                <p className="text-xs opacity-75 lg:text-sm">
                  Nhận hàng trong vòng 3 ngày
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 space-x-4 lg:flex-row">
              <Image
                src="/images/policies_icon_2.png"
                alt="Policy 2"
                width={40}
                height={40}
              />
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-bold lg:mb-[5px] lg:text-base">
                  Quà tặng hấp dẫn
                </h3>
                <p className="text-xs opacity-75 lg:text-sm">
                  Nhiều ưu đãi khuyến mãi hot
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 space-x-4 lg:flex-row">
              <Image
                src="/images/policies_icon_3.png"
                alt="Policy 3"
                width={40}
                height={40}
              />
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-bold lg:mb-[5px] lg:text-base">
                  Bảo đảm chất lượng
                </h3>
                <p className="text-xs opacity-75 lg:text-sm">
                  Sản phẩm đã dược kiểm định
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 space-x-4 lg:flex-row">
              <Image
                src="/images/policies_icon_4.png"
                alt="Policy 4"
                width={40}
                height={40}
              />
              <div className="text-center lg:text-left">
                <h3 className="text-sm font-bold lg:mb-[5px] lg:text-base">
                  Hotline: 19001993
                </h3>
                <p className="text-xs opacity-75 lg:text-sm">
                  Dịch vụ hỗ trợ bạn 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
