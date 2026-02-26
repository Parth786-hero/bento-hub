import Loader from "../../../utilis/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import { categoryWiseProduct } from "../../../store/slices/productByCategorySlice";
import AddToCartBtn from "../Products/AddToCartBtn";
export default function SpecificItem() {
  const { products, loading, error } = useSelector(
    (bag) => bag.productsByCategory
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  if (!item) {
    navigate("/");
    return;
  }
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

  if (loading) {
    return <Loader />;
  }

  if (error)
    return (
      <div className="h-auto flex items-start justify-center">
        <p className="text-center mt-33 text-2xl font-bold text-red-500">
          Error: {error}
        </p>
      </div>
    );
  return (
    <>
      <div className="mt-30 min-h-screen py-5">
        <div className="flex justify-around h-[18rem] border-b-1 border-gray-400">
          <div className="relative w-[45%] flex items-center justify-center border-r-1 border-gray-400 p-4">
            {
              discounted_price > 0 && <div className="w-[4.7rem] h-[3rem] text-center rounded-l-full bg-green text-white font-extrabold text-[14px] absolute right-0 top-0 tracking-wider leading-4.5" style={{display : "flex" , alignItems : "center" , justifyContent : "center"}}>{`${Math.floor(100 - ((discounted_price / price) * 100))}% off`}</div>
            }
            
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
              src={`/${image_url}`}
              alt="Hello"
              className="w-full h-full object-contain object-center background-center"
            />
          </div>
          <div className="w-[50%] flex items-center justify-center">
            <div className="w-full py-[1rem]">
              <p className="text-[14px] mb-4 font-normal text-gray-500">{`Home${decodeURIComponent(
                location.pathname
              )}`}</p>
              <h2 className="text-3xl font-bold tracking-wider">{name}</h2>
              <p className="text-xl my-2">{description}.</p>
              <p className="text-gray-500">{quantity}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    {discounted_price > 0 && (
                      <p className="mt-2 font-extrabold text-xl">
                        Rs.{discounted_price}
                      </p>
                    )}
                    <p
                      className={`mt-2 text-xl ${
                        discounted_price > 0 ? "text-gray-500 line-through" : ""
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
                <AddToCartBtn id={id}/>
              </div>
              <ol
                className="mt-8 text-[12px] font-extrabold tracking-wide leading-relaxed list-decimal list-inside mb-4"
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
                <li>
                  Choose from 30,000+ products across food, personal care,
                  household & other categories.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-wider">
          Similar products
        </h2>
        <div className="mt-3 grid grid-cols-6 py-1 flex-wrap gap-5">
          {products.map((ele) => {
            return ele.id !== id && <ProductCard key={ele.id} data={ele} />;
          })}
        </div>
      </div>
    </>
  );
}
