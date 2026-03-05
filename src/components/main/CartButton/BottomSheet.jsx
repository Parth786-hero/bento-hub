import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../../../hooks/useCart";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import MiniCard from "./MiniCard";
import confetti from "canvas-confetti";
import Bill from "./Bill";
export default function BottomSheet({ isOpen, onClose }) {
  const { getBag, getTotalNumbersOfItems, clearTheCart, fetchCart } =
    useCartContext();
  const { products } = useSelector((bag) => bag.products);
  const { user } = useSelector((bag) => bag.login);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const listOfAllProducts = useMemo(() => {
    return products.flatMap((obj) => obj.products);
  }, [products]);

  const cartItems = getBag();
  const val = getTotalNumbersOfItems();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, curr) => {
      const obj = listOfAllProducts.find((ele) => ele.id === curr.id);
      if (!obj) return acc;
      let amount =
        curr.count *
        (obj.discounted_price > 0 ? obj.discounted_price : obj.price);
      return amount + acc;
    }, 0);
  }, [cartItems, listOfAllProducts]);

  async function handleCheckout() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: user.cartId,
          status: "completed",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // 🎉 Confetti burst
        confetti({
          particleCount: 550,
          spread: 200,
          origin: { y: 0.6 },
        });

        // Show success overlay
        setSuccess(true);

        // Reset cart state

        // Close BottomSheet after a short delay
        setTimeout(() => {
          clearTheCart();
          localStorage.removeItem("cart");
          fetchCart();
          setSuccess(false);
          onClose();
        }, 2100);
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Side sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            // style={{backgroundColor : "white!important"}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bg-white top-0 right-0 h-full shadow-lg z-50 w-[40%] max-w-sm flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-5">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <h2 className="text-xl font-extrabold">My Cart</h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-black font-extrabold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cart items */}
            <ul className="space-y-2 p-5 flex-1 overflow-y-auto bg-white">
              {cartItems.map((item) => {
                const product = listOfAllProducts.find((p) => p.id === item.id);
                return (
                  <MiniCard key={product.id} data={product} onClose={onClose} />
                );
              })}
             <Bill price={totalPrice}/>
            </ul>

            {/* Checkout bar */}
            <div className="flex items-center justify-between font-bold h-[7rem] bg-green text-white px-5 rounded-t-2xl">
              <div className="flex flex-col items-start justify-start">
                <p className="font-extrabold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(totalPrice + 11 + (totalPrice < 100 ? 30 : 0))}
                </p>
                <p className="font-normal text-[14px] tracking-wider">Total</p>
              </div>
              {loading ? (
                <p className="border-2 px-5 py-2 rounded-xl shadow-xl">
                  Checking out...
                </p>
              ) : error ? (
                <p className="text-red-500 font-bold text-[14px] border-1 px-5 py-2 rounded-xl">
                  {error}
                </p>
              ) : (
                <p
                  onClick={handleCheckout}
                  className="font-extrabold tracking-wider cursor-pointer border-2 px-5 py-2 rounded-xl shadow-xl 
                             transform transition duration-300 ease-in-out hover:scale-105"
                >
                  Checkout
                </p>
              )}
            </div>
          </motion.div>

          {/* Success overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-white p-8 rounded-xl shadow-xl text-center"
                >
                  <p className="text-2xl font-bold text-green">
                    Order Placed Successfully!
                  </p>
                  <p className="text-gray-600 mt-2">
                    Thank you for shopping 🎉
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
