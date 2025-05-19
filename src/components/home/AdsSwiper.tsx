import { Button } from "../ui/button";
import ReusableSwiper from "../swiper/Swiper";
import DataFetcher from "../DataFetcher";

export default function AdsSwiper() {
  return (
    <>
      <DataFetcher<any>
        url="/api/public/add-ons"
        render={(ads) => {
          return (
            <ReusableSwiper>
              {ads?.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-full h-full object-cover bg-cover flex items-center justify-start text-white text-xl"
                  style={{ backgroundImage: `url(${item?.logo})` }}
                >
                  <div className="!ms-[90px]">
                    <div className="w-[70%]">
                      <h2 className="text-[48px] font-[700]">{item?.title}</h2>
                    </div>
                    <div className="mt-18">
                      <h2 className="text-[15px]">{item.description}</h2>
                    </div>
                    <div className="mt-9">
                      <Button className="bg-[var(--main)] w-[190px] h-[3.2em] text-[20px] py-6 hover:bg-[var(--main)]">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ReusableSwiper>
          );
        }}
      />
    </>
  );
}
