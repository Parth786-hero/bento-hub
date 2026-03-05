import { useNavigate } from "react-router-dom";

import MiniBtn from "./MiniBtn";
// import AddToCartBtn from "../Products/AddToCartBtn";
import { useCartContext } from "../../../hooks/useCart";
export default function MiniCard(props) {
  const { getItemsPerCard } = useCartContext();

  const {
    description,
    name,
    price,
    image_url,
    quantity,
    id,
    category_name,
    discounted_price,
  } = props.data;
  const nums = getItemsPerCard(id);

  const navigate = useNavigate();

  function shoot(e) {
    navigate(`/${category_name}/${id}`, { state: { item: props.data } });
  }

  return (
    <>
      <div
      key={id}
        className="w-full flex items-center justify-between gap-x-3 h-[6rem] overflow-hidden pb-2 border-b-1 border-gray-200 mb-2"
        style={{
          // backgroundColor: "white",
          // border: "1px solid rgba(0 , 0 , 0 , .2)",
        }}
        // onClick={shoot}
      >
        <div className="overflow-hidden relative border border-gray-300 w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-xl">
          {/* {discounted_price > 0 && (
            <div
              className="bg-green text-white w-[2.2rem] h-[2.2rem] rounded-b-full text-[11px] text-center p-2 font-extrabold tracking-wide absolute right-2 top-0 leading-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${Math.floor(100 - ((discounted_price / price) * 100))}% off`}
            </div>
          )} */}
          <img
            src={`/${image_url}`}
            alt="scene description"
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="w-full p-1 flex-col flex justify-between h-full">
          <h2 className="text-[14px] tracking-wide">{name}</h2>
         
          <p className="text-[12px] tracking-wide text-gray-500">{quantity}</p>
          <div className="flex items-center justify-between self-end w-full overflow-hidden">
            <div className="flex items-start justify-start gap-2">
              {discounted_price > 0 && (
                <p className="font-bold text-[13px] ">₹{discounted_price}</p>
              )}
              <p
                className={`font-bold text-[12.5px] ${
                  discounted_price > 0 ? "text-gray-400 line-through" : ""
                }`}
              >
                ₹{price}
              </p>
            </div>
          <MiniBtn id={id}/>
          </div>
        </div>
      </div>
    </>
  );
}
