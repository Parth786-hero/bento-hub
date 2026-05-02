// import { motion } from "framer-motion";
// import { useCartContext } from "../../../hooks/useCart";
// import { useSelector , useDispatch} from "react-redux";
// import { useMemo } from "react";
// import BottomSheet from "./BottomSheet";
// import { useState, useEffect } from "react";
// import { changeModalStatus } from "../../../store/slices/modalSlice";
// export default function CartButton() {
//   const dispatch = useDispatch();
//   const [donation, setDonation] = useState(() => {
//     // read from localStorage on first render
//     return localStorage.getItem("donation") === "true";
//   });
  
//   // whenever donation changes, save it
 
//   const [isOpen, setIsOpen] = useState(false);
//   const { getTotalNumbersOfItems, getBag } = useCartContext();
//   const { products, error, loading } = useSelector((bag) => bag.products);
//   const {user} = useSelector(bag=>bag.login);
  
  
//   const listOfAllProducts = useMemo(() => {
//     return products.flatMap((obj) => obj.products);
//   }, [products]);

//   products.forEach((obj) => {
//     listOfAllProducts.push(...obj.products);
//   });
//   const cartItems = getBag();
//   const val = getTotalNumbersOfItems();
//     useEffect(() => {
//     if (val === 0 && isOpen) {
//       setIsOpen(false);
//     }
//   }, [val, isOpen]);

//   const totalPrice = useMemo(() => {
//     return cartItems.reduce((acc, curr) => {
//       const obj = listOfAllProducts.find((ele) => ele.id === curr.id);
//       if (!obj) return acc;
//       let amount = 0;
//       if (obj.discounted_price > 0) {
//         amount = curr.count * obj.discounted_price;
//       } else {
//         amount = curr.count * obj.price;
//       }
//       return amount + acc;
//     }, 0);
//   }, [cartItems, listOfAllProducts]);
  

//   useEffect(() => {
//     localStorage.setItem("donation", donation);
//   }, [donation]);
//   return (
//     <>
//       {user.email === "kapoorparth096@gmail.com" ? <motion.button
//         // disabled
//         className="cart-btn-1 rounded-md font-semibold shadow-md flex items-center justify-center gap-2 bg-green"
//         whileHover={{
//           x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
//           transition: { duration: 0.4 },
//         }}
//         whileTap={{
//           scale: 0.95,
//           x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
//           transition: { duration: 0.3 },
//         }}
//         onClick={() =>
//           dispatch(changeModalStatus({ show: true, mode: "ADD_PRODUCT" }))
        
//         }
//       >
        
//         <span className="font-extrabold text-[1rem]">Add Product</span>
//       </motion.button>: loading ?  <motion.button
//         disabled
//         className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2"
//         whileHover={{
//           x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
//           transition: { duration: 0.4 },
//         }}
//         whileTap={{
//           scale: 0.95,
//           x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
//           transition: { duration: 0.3 },
//         }}
//       >
//         <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
//         <span className="font-extrabold text-[1rem]">My Cart</span>
//       </motion.button>: val > 0 ? (
//         <>
//           <motion.button
//             onClick={() => setIsOpen(true)}
//             className="items-btn rounded-md font-semibold shadow-md flex items-center-safe gap-2 px-2"
//             whileHover={{
//               x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
//               transition: { duration: 0.4 },
//             }}
//             whileTap={{
//               scale: 0.95,
//               x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
//               transition: { duration: 0.3 },
//             }}
//           >
//             <i className="text-[1.3rem] fa-solid fa-cart-shopping flex-1 w-[50%]"></i>
//             <div className="flex-col items-start justify-start text-[13px] tracking-wider font-extrabold flex w-[75%] flex-2">
//               <p>{val} items</p>
//               <p>
//                 {new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 2,
//                 }).format(totalPrice)}
//               </p>
//             </div>
//           </motion.button>
//           <BottomSheet
//             isOpen={isOpen}
//             onClose={() => setIsOpen(false)}
//             donation={donation}
//             setDonation={setDonation}
//           />
//         </>
//       ) : (
//         <motion.button
//           disabled
//           className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2"
//           whileHover={{
//             x: [0, -10, 10, -10, 10, 0], // small horizontal jitter
//             transition: { duration: 0.4 },
//           }}
//           whileTap={{
//             scale: 0.95,
//             x: [0, -11, 11, -11, 11, 0], // stronger jitter on click
//             transition: { duration: 0.3 },
//           }}
//         >
//           <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
//           <span className="font-extrabold text-[1rem]">My Cart</span>
//         </motion.button>
//       )}
//     </>
//   );
// }

import { motion, useAnimation } from "framer-motion";
import { useCartContext } from "../../../hooks/useCart";
import { useSelector , useDispatch} from "react-redux";
import { useMemo, useEffect, useState } from "react";
import BottomSheet from "./BottomSheet";
import { changeModalStatus } from "../../../store/slices/modalSlice";

export default function CartButton() {
  const dispatch = useDispatch();
  const [donation, setDonation] = useState(() => localStorage.getItem("donation") === "true");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalNumbersOfItems, getBag } = useCartContext();
  const { products, loading } = useSelector((bag) => bag.products);
  const { user } = useSelector(bag => bag.login);

  const listOfAllProducts = useMemo(() => products.flatMap(obj => obj.products), [products]);
  const cartItems = getBag();
  const val = getTotalNumbersOfItems();

  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate only when first item is added
  useEffect(() => {
    if (val === 1 && !hasAnimated) {
      controls.start({
        scale: [1, 1.2, 0.95, 1],
        boxShadow: [
          "0 0 0px rgba(0,0,0,0)",
          "0 0 12px rgba(0,128,0,0.4)",
          "0 0 0px rgba(0,0,0,0)"
        ],
        transition: { duration: 0.4, ease: "easeOut" }
      });
      setHasAnimated(true);
    }
  }, [val, hasAnimated, controls]);

  useEffect(() => {
    if (val === 0) {
      setIsOpen(false);
      setHasAnimated(false); // reset so animation can play again next time
    }
  }, [val]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, curr) => {
      const obj = listOfAllProducts.find(ele => ele.id === curr.id);
      if (!obj) return acc;
      const amount = curr.count * (obj.discounted_price > 0 ? obj.discounted_price : obj.price);
      return acc + amount;
    }, 0);
  }, [cartItems, listOfAllProducts]);

  useEffect(() => {
    localStorage.setItem("donation", donation);
  }, [donation]);

  return (
    <>
      {user.email === "kapoorparth096@gmail.com" ? (
        <motion.button
          className="cart-btn-1 rounded-md font-semibold shadow-md flex items-center justify-center gap-2 bg-green"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(changeModalStatus({ show: true, mode: "ADD_PRODUCT" }))}
        >
          <span className="font-extrabold text-[1rem]">Add Product</span>
        </motion.button>
      ) : loading ? (
        <motion.button disabled className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2">
          <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
          <span className="font-extrabold text-[1rem]">My Cart</span>
        </motion.button>
      ) : val > 0 ? (
        <>
          <motion.button
            animate={controls} // animate only on first item
            onClick={() => setIsOpen(true)}
            className="items-btn rounded-md font-semibold shadow-md flex items-center gap-2 px-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="text-[1.3rem] fa-solid fa-cart-shopping"></i>
            <div className="flex-col items-start justify-start text-[13px] tracking-wider font-extrabold flex">
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
          <BottomSheet
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            donation={donation}
            setDonation={setDonation}
          />
        </>
      ) : (
        <motion.button disabled className="cart-btn rounded-md font-semibold shadow-md flex items-center justify-center gap-2">
          <i className="text-[1rem] fa-solid fa-cart-shopping"></i>
          <span className="font-extrabold text-[1rem]">My Cart</span>
        </motion.button>
      )}
    </>
  );
}
