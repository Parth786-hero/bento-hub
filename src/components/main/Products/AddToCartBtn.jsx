import { useCartContext } from "../../../hooks/useCart";
import { useSelector } from "react-redux";
import { useState , useEffect } from "react";
export default function AddToCartBtn({ id }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { getItemsPerCard, addToCart, removeFromCart, error } =
    useCartContext();
  const nums = getItemsPerCard(id);
  const {products} = useSelector(bag=>bag.products);
  const allProducts = products.flatMap(ele=>ele.products);
  const stock = allProducts.find(ele=>ele.id === id)?.stock;
 const {user} = useSelector(bag=>bag.login);
 console.log(error);
 useEffect(() => {
  const checkScreen = () => {
    setIsSmallScreen(window.innerWidth < 768); // md breakpoint
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);
  if (stock === 0) {
    return (
      <button
        className={`${isSmallScreen ? "product-btn-out-of-stock-mini" : "product-btn-out-of-stock"} cursor-not-allowed`}
        disabled
      >
        {" "}
        Out of Stock{" "}
      </button>
    );
  }
  return (
    <>
      {nums === 0 ? (
        <button
          className={`${isSmallScreen ? "product-mini-btn" : "product-btn"} font-semibold cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
            // triggerSnapshot();
          }}
          disabled={error || user.email === "kapoorparth096@gmail.com" ? true : false}
          style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
        >
          Add
        </button>
      ) : (
        <div
          className="border-green border-1 adding-to-cart-btn font-semibold flex items-center justify-between gap-2 cursor-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
        >
          <i
            disabled={error ? true : false}
            className="fa-solid fa-minus inline-block cursor-pointer"
            onClick={() => {
              removeFromCart(id);
              // triggerSnapshot();
            }}
          ></i>
          <p className="font-extrabold text-[16px]">{nums}</p>
          <i
            disabled={error ? true : false}
            className="fa-solid fa-plus inline-block cursor-pointer"
            onClick={() => {
              addToCart(id);
              // triggerSnapshot();
            }}
          ></i>
        </div>
      )}
    </>
  );
}
