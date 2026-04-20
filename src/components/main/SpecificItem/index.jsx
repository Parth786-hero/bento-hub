import Loader from "../../../utilis/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import ProductCard from "../Products/ProductCard";
import { categoryWiseProduct } from "../../../store/slices/productByCategorySlice";
import AddToCartBtn from "../Products/AddToCartBtn";
import { useCartContext } from "../../../hooks/useCart";
import { fetchAllProducts } from "../../../store/slices/productSlice";
export default function SpecificItem() {
  const { productLimitError } = useCartContext();
  const { products, loading, error } = useSelector(
    (bag) => bag.productsByCategory
  );
  const { products: allProducts } = useSelector((bag) => bag.products);

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const {
    id,
    description,
    image_url,
    name,
    price,
    quantity,
    discounted_price,
  } = item;
  useEffect(() => {
    dispatch(categoryWiseProduct(id));
  }, [dispatch]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      dispatch(categoryWiseProduct(id));
    }
  }, [allProducts]);

  useEffect(() => {
    if (!item) {
      navigate("/");
    }
  }, [item, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="h-auto flex items-start justify-center">
          <p className="text-center mt-33 text-2xl font-bold text-red-500">
            Error: {error}
          </p>
        </div>
      ) : (
        <div className="mt-40 md:mt-30 md:min-h-screen py-5">
          <div className="flex justify-around h-auto md:h-[19.5rem] border-b-1 border-gray-400">
            <div className="relative w-[45%] flex items-center justify-center border-r-1 border-gray-400 p-4">
              {discounted_price > 0 && (
                <div
                  className="w-[4.7rem] h-[3rem] text-center rounded-l-full bg-green text-white font-extrabold text-[14px] absolute right-0 top-0 tracking-wider leading-4.5"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >{`${Math.floor(
                  100 - (discounted_price / price) * 100
                )}% off`}</div>
              )}

              <i
                className="fa-regular fa-circle-left text-[1.5rem] absolute left-0 top-[-.8rem] cursor-pointer hover:scale-105"
                style={{
                  padding: ".8rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => navigate("/")}
              ></i>
              <img
                // src={`/${image_url}`}
                src={`${import.meta.env.BASE_URL}${image_url}`}
                alt="Hello"
                className="w-full h-full object-contain object-center background-center"
              />
            </div>
            <div className="w-[50%] flex items-center justify-center">
              <div className="w-full py-[1rem]">
                <p className="text-[14px] mb-4 font-normal text-gray-500">{`Home${decodeURIComponent(
                  location.pathname
                )}`}</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-wider">{name}</h2>
                <p className="text-lg md:text-xl my-2">{description
                }.</p>
                <p className="text-gray-500">{quantity}</p>
                <div className="relative flex items-center justify-between">
                  {productLimitError?.id === id && (
                    <p className="text-[9px] md:text-[11px] text-red-600 absolute right-0 top-[-.7rem] font-bold tracking-wide animate-fade">
                      {productLimitError.message}
                    </p>
                  )}
                  <div>
                    <div className="flex items-center gap-2.5 md:gap-3">
                      {discounted_price > 0 && (
                        <p className="mt-2 font-extrabold md:text-lg md:text-xl">
                          Rs.{discounted_price}
                        </p>
                      )}
                      <p
                        className={`mt-2 text-md md:text-xl ${
                          discounted_price > 0
                            ? "text-gray-500 line-through"
                            : ""
                        }`}
                      >
                        Rs.{price}
                      </p>
                    </div>
                    <p className="text-gray-600 text-[12px] mt-[-.2rem]">
                      (inclusive of all taxes)
                    </p>
                  </div>
                  {/* <button className="specific-cart-btn">Add To cart</button> */}
                  <AddToCartBtn id={id} />
                </div>
                <ol
                  className="hidden md:block mt-5 text-[12px] font-extrabold tracking-wide leading-relaxed list-decimal list-inside mb-4"
                  type="1"
                >
                  <li>
                    Get items delivered to your doorstep from dark stores near
                    you, whenever you need them.
                  </li>
                  <li>
                    Best price destination with offers directly from the
                    manufacturers.
                  </li>
                  {description.length <= 80 && (
                    <li>
                      Choose from 30,000+ products across food, personal care,
                      household & other categories.
                    </li>
                  )}
                </ol>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-wider">
            Similar products
          </h2>
          <div className="mt-3 grid grid-cols-3 md:grid-cols-6 py-1 flex-wrap gap-5">
            {products.map((ele) => {
              return ele.id !== id && <ProductCard key={ele.id} data={ele} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
