import { formatReadableDateTime } from "../../../utilis/priceUtils";
import { Dot } from "lucide-react";
export default function MyOrderCard({ created_at, products }) {
  return (
    <>
      <div
        className="cursor-pointer mb-6 md:mb-4 flex flex-col gap-3 rounded-xl px-4 py-3 transition-scale duration-200 hover:scale-102"
        style={{ border: "1px solid rgba(0 , 0,0 , .1)" }}
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
        <section className="flex items-start gap-4">
          {products.map((obj, id) => {
            return (
              <div
                key={id}
                className="flex items-center justify-center w-24 h-16 rounded-xl overflow-hidden flex items-center justify-center py-1"
                style={{ border: "1px solid rgba(0 , 0 , 0 ,.1)" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${obj.image_url}`}
                  className="object-contain w-full h-full"
                  alt="product"
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
// className="rounded-lg mb-4 py-3 px-4" style={{border : "1px solid rgba(0 , 0 , 0 , .1)"}}
