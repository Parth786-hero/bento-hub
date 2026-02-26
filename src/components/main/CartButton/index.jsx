import { motion } from "framer-motion";
import { useCartContext } from "../../../hooks/useCart";
import { useSelector } from "react-redux";
import { useMemo } from "react";
export default function CartButton() {
  const { getTotalNumbersOfItems, getBag } = useCartContext();
  const { products, error, loading } = useSelector((bag) => bag.products);
 
  const listOfAllProducts = useMemo(() => {
    return products.flatMap(obj => obj.products);
  }, [products]);
  
  
 
  products.forEach((obj) => {
    listOfAllProducts.push(...obj.products);
  });
  const cartItems = getBag();
  const val = getTotalNumbersOfItems();
  //   const totalAmount =

  const totalPrice = useMemo(()=>{
    return cartItems.reduce((acc, curr) => {
        const obj = listOfAllProducts.find((ele) => ele.id === curr.id);
        if(!obj) return acc;
        let amount = 0;
        if (obj.discounted_price > 0) {
          amount = curr.count * obj.discounted_price;
        } else {
          amount = curr.count * obj.price;
        }
        return amount + acc;
      }, 0);
  } , [cartItems , listOfAllProducts])

  if (loading) {
    return (
      <motion.button
        disabled
        className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2"
        whileHover={{
          x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
          transition: { duration: 0.4 },
        }}
        whileTap={{
          scale: 0.95,
          x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
          transition: { duration: 0.3 },
        }}
      >
        <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
        <span className="font-extrabold text-[1rem]">My Cart</span>
      </motion.button>
    
    
    );
  }
  
  return (
    <>
      {val > 0 ? (
        <motion.button
          disabled
          className="items-btn rounded-md font-semibold shadow-md flex items-center-safe gap-2 px-2"
          whileHover={{
            x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
            transition: { duration: 0.4 },
          }}
          whileTap={{
            scale: 0.95,
            x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
            transition: { duration: 0.3 },
          }}
        >
          <i className="text-[1.3rem] fa-solid fa-cart-shopping flex-1 w-[50%]"></i>
          <div className="flex-col items-start justify-start text-[13px] tracking-wider font-extrabold flex w-[75%] flex-2">
            <p>{val} items</p>
            <p>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
              }).format(totalPrice)}
            </p>
          </div>
        </motion.button>
      ) : (
        <motion.button
          disabled
          className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2"
          whileHover={{
            x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
            transition: { duration: 0.4 },
          }}
          whileTap={{
            scale: 0.95,
            x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
            transition: { duration: 0.3 },
          }}
        >
          <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
          <span className="font-extrabold text-[1rem]">My Cart</span>
        </motion.button>
      )}
    </>
  );
}
