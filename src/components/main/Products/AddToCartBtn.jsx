// import { useCartContext } from "../../../hooks/useCart";
// import { useSelector } from "react-redux";
// import { useState , useEffect } from "react";
// import { checkAuthority } from "../../../utilis/priceUtils";
// import { Plus } from "lucide-react";
// export default function AddToCartBtn({ id }) {
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const { getItemsPerCard, addToCart, removeFromCart, error } =
//     useCartContext();
//   const nums = getItemsPerCard(id);
//   const {products} = useSelector(bag=>bag.products);
//   const allProducts = products.flatMap(ele=>ele.products);
//   const stock = allProducts.find(ele=>ele.id === id)?.stock;
//  const {user} = useSelector(bag=>bag.login);
 
//  useEffect(() => {
//   const checkScreen = () => {
//     setIsSmallScreen(window.innerWidth < 768); // md breakpoint
//   };
//   checkScreen();
//   window.addEventListener("resize", checkScreen);
//   return () => window.removeEventListener("resize", checkScreen);
// }, []);
//   if (stock === 0) {
//     return (
//       <button
//         className={`${isSmallScreen ? "product-btn-out-of-stock" : "product-btn-out-of-stock"} cursor-not-allowed`}
//         disabled
//       >
//         {" "}
//         Sold out{" "}
//       </button>
//     );
//   }
  
//   return (
//     <>
//       {nums === 0 ? (
//         <button
//           className={`${isSmallScreen ? "product-btn" : "product-btn"} font-semibold cursor-pointer absolute right-0 top-0 border border-green   rounded-lg p-1`}
//           onClick={(e) => {
//             e.stopPropagation();
//             addToCart(id);
//             // triggerSnapshot();
//           }}
//           // disabled={error || checkAuthority(user.email)}
//           style={{ backgroundColor: error ? "gray" : "rgba(0, 128, 0, 0.05)"}}
//         >
//           <Plus className="text-green" />
//         </button>
//       ) : (
//         <div
//           className="border-green border-1 adding-to-cart-btn font-semibold flex items-center justify-between gap-2 cursor-auto"
//           onClick={(e) => e.stopPropagation()}
//           style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
//         >
//           <i
//             disabled={error ? true : false}
//             className="fa-solid fa-minus inline-block cursor-pointer"
//             onClick={() => {
//               removeFromCart(id);
//               // triggerSnapshot();
//             }}
//           ></i>
//           <p className="font-extrabold text-[16px]">{nums}</p>
//           <i
//             disabled={error ? true : false}
//             className="fa-solid fa-plus inline-block cursor-pointer"
//             onClick={() => {
//               addToCart(id);
//               // triggerSnapshot();
//             }}
//           ></i>
//         </div>
//       )}
//     </>
//   );
// }

import { useCartContext } from "../../../hooks/useCart";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { checkAuthority } from "../../../utilis/priceUtils";

export default function AddToCartBtn({ id }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { getItemsPerCard, addToCart, removeFromCart, error } = useCartContext();
  const nums = getItemsPerCard(id);
  const { products } = useSelector((bag) => bag.products);
  const allProducts = products.flatMap((ele) => ele.products);
  const stock = allProducts.find((ele) => ele.id === id)?.stock;
  const { user } = useSelector(bag => bag.login);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (stock === 0) {
    return (
      <button
        className="text-sm px-2 py-0.5 right-0.5 top-0.5 cursor-not-allowed absolute bg-gray-800 w-fit rounded-full text-center text-white tracking-wider"
        disabled
      >
        out of stock
      </button>
    );
  }

  return (
    <AnimatePresence>
  {nums === 0 ? (
    isSmallScreen ? (
      // Plain button on small screens
      <button
        key="add"
        disabled={error || checkAuthority(user.email)}
        className="product-btn font-semibold cursor-pointer absolute right-0.5 top-0.5 bg-green rounded-lg py-0.5 px-1.5"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(id);
        }}
        // style={{ backgroundColor: error ? "gray" : "rgba(0, 128, 0, 0.04)" }}
        style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
      >
        {/* <Plus
         className="text-green" /> */}
         <span className="text-white font-bold tracking-wider text-sm" style={{fontWeight : 800}}>ADD</span>
      </button>
    ) : (
      // Animated button on larger screens
      <motion.button
        key="add"
        disabled={error || checkAuthority(user.email)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className="product-btn font-semibold cursor-pointer absolute right-0.5 top-0.5 border border-green rounded-lg p-1"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(id);
        }}
        style={{ backgroundColor: error ? "gray" : "rgba(0, 128, 0, 0.05)" }}
      >
        <Plus className="text-green" />
      </motion.button>
    )
  ) : (
    isSmallScreen ? (
      // Plain counter on small screens
      <div
        key="counter"
        className="border-green border-1 adding-to-cart-btn font-semibold flex items-center justify-between gap-2 cursor-auto absolute top-0.5 right-0.5"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
      >
        <i
          className="fa-solid fa-minus inline-block cursor-pointer"
          onClick={() => removeFromCart(id)}
        ></i>
        <p className="font-extrabold text-[16px]">{nums}</p>
        <i
          className="fa-solid fa-plus inline-block cursor-pointer"
          onClick={() => addToCart(id)}
        ></i>
      </div>
    ) : (
      // Animated counter on larger screens
      <motion.div
        key="counter"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="border-green border-1 adding-to-cart-btn font-semibold flex items-center justify-between gap-2 cursor-auto absolute top-0.5 right-0.5"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: error ? "gray" : "var(--color-green)" }}
      >
        <motion.i
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-minus inline-block cursor-pointer"
          onClick={() => removeFromCart(id)}
        ></motion.i>
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.15 }}
          className="font-extrabold text-[16px]"
        >
          {nums}
        </motion.p>
        <motion.i
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-plus inline-block cursor-pointer"
          onClick={() => addToCart(id)}
        ></motion.i>
      </motion.div>
    )
  )}
</AnimatePresence>

  );
}
