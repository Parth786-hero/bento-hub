import { formatReadableDateTime } from "../../../utilis/priceUtils";
import { Dot } from "lucide-react";
export default function MyOrderCard({ created_at, products }) {
  return (
    <>
      <div
        className="cursor-pointer mb-6 md:mb-4 flex flex-col gap-3 rounded-xl p-4 transition-scale duration-200 hover:scale-102 shadow-xl"
        
      >
        <section
          className="flex items-center justify-between pb-2"
          style={{ borderBottom: "1px solid rgba(0 , 0 , 0 , .15)" }}
        >
          <div className="flex md:w-1/2 gap-2.5">
            <i
              className="fa-solid fa-check rounded-xl text-green bg-green-100 flex items-center justify-center"
              style={{
                width: "2.6rem",
                height: "2.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></i>
            <div>
              <h2 className="font-black text-[16px]">
                Arrived in{" "}
                {(() => {
                  const rand = Math.floor(Math.random() * 20);
                  return rand === 0 ? 10 : rand;
                })()}{" "}
                minutes
              </h2>

              <p className="text-gray-600 text-[11px] flex items-center">
                <span>
                  ₹
                  {products.reduce((acc, curr) => {
                    return acc + +curr["purchased_price"];
                  }, 0)}
                </span>
                <span className="flex">
                  <Dot />
                </span>
                <span>{formatReadableDateTime(created_at)}</span>
              </p>
            </div>
          </div>
          <i className="fa-solid fa-arrow-right cursor-pointer"></i>
        </section>
        <section className="flex items-center gap-4">
          {(products.length > 3 ? products.slice(0, 3) : products).map(
            (obj, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-24 h-16 rounded-xl overflow-hidden py-1"
                style={{ border: "1px solid rgba(0 , 0 , 0 ,.1)" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${obj.image_url}`}
                  className="object-contain w-full h-full"
                  alt="product"
                />
              </div>
            )
          )}

          {/* If more than 3, show +remaining */}
          {products.length > 3 && (
            <div
              className="flex items-center justify-center rounded-xl overflow-hidden py-1 font-bold text-xl text-black"
              // style={{ border: "1px solid rgba(0 , 0 , 0 ,.1)" }}
            >
              +{products.length - 3}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
// className="rounded-lg mb-4 py-3 px-4" style={{border : "1px solid rgba(0 , 0 , 0 , .1)"}}
