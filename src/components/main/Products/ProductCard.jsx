import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCart";
import AddToCartBtn from "./AddToCartBtn";
export default function ProductCard(props) {
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
        className="w-[12.5rem] h-[17.5rem] rounded-xl shadow-xl cursor-pointer border-gray-900"
        style={{
          backgroundColor: "white",
          border: "1px solid rgba(0 , 0 , 0 , .2)",
        }}
        onClick={shoot}
      >
        <div className="w-full h-[45%] overflow-hidden p-4 relative">
          {discounted_price > 0 && (
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
          )}
          <img
            src={`/${image_url}`}
            alt="scene description"
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="w-full h-[55%] p-3 flex-col flex justify-betwee pb-4">
          <h2 className="font-extrabold tracking-wide">{name}</h2>
          {description.length > 15 ? (
            <p className="text-[14px] tracking-wide leading-snug my-1">
              {description.slice(0, 16) + "..."}
            </p>
          ) : (
            <p className="text-[14px] tracking-wide leading-snug my-1">
              {description}
            </p>
          )}
          <p className="text-[12px] tracking-wide text-gray-500">{quantity}</p>
          <div className="flex items-center justify-between self-end w-full h-[2.7rem] mt-3 overflow-hidden">
            <div>
              {discounted_price > 0 && (
                <p className="text-[13px] ">₹{discounted_price}</p>
              )}
              <p
                className={`font-extrabold text-[13px] ${
                  discounted_price > 0 ? "text-gray-400 line-through" : ""
                }`}
              >
                ₹{price}
              </p>
            </div>
          <AddToCartBtn id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
