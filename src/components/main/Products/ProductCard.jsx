import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCart";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { changeModalStatus } from "../../../store/slices/modalSlice";
import { useEffect, useState } from "react";
// import { Flame } from "lucide-react";
import { motion } from "framer-motion";
export default function ProductCard(props) {
  const dispatch = useDispatch();
  const { getItemsPerCard, productLimitError } = useCartContext();
  const { user } = useSelector((bag) => bag.login);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
    navigate(`/${name}/${id}`, { state: { item: props.data } });
  }

  function handleEditFunc(e) {
    e.stopPropagation();
    dispatch(
      changeModalStatus({
        show: true,
        mode: "UPDATE_PRODUCT",
        payload: props.data,
      })
    );
    // if (props.onUpdated) props.onUpdated();
  }
  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <>
      <div
        className="min-w-[95px] transition ease-in-out duration-200 hover:scale-105"
        onClick={shoot}
      >
        <div className="relative w-full h-40 overflow-hidden rounded-xl p-2 pb-2.5 border border-gray-300">
          {/* Image */}

          {Math.floor(100 - (discounted_price / price) * 100) === 50 && (
            <div
             
              className="absolute top-0.5 left-0.5 animate-pulse"
            >
              <span className="text-gray-800 text-md px-1 py-0.5 rounded-full text-xs font-bold">
                🔥50% off
              </span>
            </div>
          )}

          <img
            src={`${import.meta.env.BASE_URL}${image_url}`}
            alt="scene description"
            className="w-full h-full object-contain"
          />
          {/* {user.email === "kapoorparth096@gmail.com" && (
            <i
              className="absolute top-1 left-2 fa-solid fa-pencil grid text-center items-center justify-center block shadow-xl rounded-full text-md bg-gray-200 hover:scale-110"
              onClick={handleEditFunc}
              style={{ padding: ".7rem", width: "2.5rem", height: "2.5rem" }}
            ></i>
          )} */}
          <p
            className="absolute bottom-0 left-0 text-[9px] flex items-center justify-center gap-0.5 font-semibold shadow rounded-sm px-0.5 py-0.5 bg-green-100 w-full"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              <i className="fa-regular fa-alarm-clock"></i>
            </span>
            delivery in 11 MINS
          </p>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full">
            {productLimitError?.id === id && (
              <p className="text-[11px] text-red-600 font-bold tracking-wide animate-fade w-full text-center">
                {productLimitError?.message}
              </p>
            )}
          </div>
        </div>

        <div className="px-1.5 py-1">
          <h2 className="font-extrabold mt-1 line-clamp-2 text-gray-800">
            {name} {description} Made with love
          </h2>
          <p className="text-[13px] md:tracking-wide text-gray-500 my-1 md:my-0">
            {quantity}
          </p>
          <div className="flex items-center w-full">
            <div>
              <span className="font-black text-green text-sm">
                {Math.floor(100 - (discounted_price / price) * 100) === 100
                  ? "exclusive"
                  : `${Math.floor(
                      100 - (discounted_price / price) * 100
                    )}% off`}
              </span>
            </div>

            <div className="flex-1 border-b border-gray-300 ml-2"></div>
          </div>
          <div className="flex items-center gap-x-1 my-1">
            {discounted_price > 0 && (
              <p className="text-gray-900 font-black text-[13.5px] ">
                ₹{discounted_price}
              </p>
            )}
            <p
              className={`${
                discounted_price == 0
                  ? "text-gray-700 font-black text-[13.5px]"
                  : "font-bold text-[12.5px] text-gray-400 line-through"
              }`}
            >
              ₹{price}
            </p>
          </div>
          <AddToCartBtn id={id} />
        </div>
      </div>
    </>
  );
}
