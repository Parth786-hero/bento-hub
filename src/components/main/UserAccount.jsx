import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/loginSlice";
import { changeModalStatus } from "../../store/slices/modalSlice";
import { useCartContext } from "../../hooks/useCart";


export default function UserAccount() {
  const dispatch = useDispatch();
  const { clearTheCart } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const {user : obj , loading} = useSelector((bag) => bag.login);
  const [error , setError] = useState();
  const [loader , setLoader] = useState(false);
  const dropdownRef = useRef(null);
  // console.log(loginError);
  async function logUserOut() {
    setLoader(true);
    try {
      // Step 2: Call logout API
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    
     
      // Step 3: Clear auth state and show login modal
      dispatch(logout());
      dispatch(changeModalStatus({ show: true, mode: "LOG_IN" }));
      clearTheCart();
    
      // Step 4: Clear cart locally
      localStorage.removeItem("cart"); // clears only cart key
     
    } catch (err) {
      setError("Switch on the server please");
      
    }finally{
      setLoader(false);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <motion.p
        className="px-2 py-2 rounded-md cursor-pointer font-extrabold text-[18px] flex items-center gap-1 justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        My Account
        {isOpen ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
      </motion.p>

      {/* AnimatePresence handles exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute mt-2 bg-white shadow-xl rounded-md p-4 z-50 h-auto overflow-hidden w-[18rem] left-[-50%]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-bold text-black">{obj.fname}</h2>
            <p className="mt-1 text-[12px] text-gray-800">+91 {obj.number}</p>
            <hr className="mt-1" />
            <div className="flex text-gray-700 text-[15px] tracking-wide flex-col gap-y-3 mt-2">
              <p className="cursor-pointer hover:bg-gray-200 px-2 rounded">
                My Orders
              </p>
              <p className="cursor-pointer hover:bg-gray-200 px-2 rounded">
                Saved Address
              </p>
              <p className="cursor-pointer hover:bg-gray-200 px-2 rounded">
                E-Gift Cards
              </p>
              <p className="cursor-pointer hover:bg-gray-200 px-2 rounded">
                Account Privacy
              </p>
             {
              loader ?  <motion.p
              className="bg-green cursor-pointer font-bold w-fit text-white rounded-md px-6 py-1"
             
              whileHover={{
                x: [0, -2, 2, -2, 2, 0],
                transition: { duration: 0.4 },
              }}
              whileTap={{
                scale: 0.95,
                x: [0, -3, 3, -3, 3, 0],
                transition: { duration: 0.3 },
              }}
            >
              logging out...
            </motion.p> : error ? <div className="text-[14px] text-red-500 font-bold">{error}</div> :  <motion.p
                className="bg-green cursor-pointer font-bold w-fit text-white rounded-md px-6 py-1"
                onClick={logUserOut}
                whileHover={{
                  x: [0, -2, 2, -2, 2, 0],
                  transition: { duration: 0.4 },
                }}
                whileTap={{
                  scale: 0.95,
                  x: [0, -3, 3, -3, 3, 0],
                  transition: { duration: 0.3 },
                }}
              >
                log out
              </motion.p>
             }
            </div>
            <div className="flex items-center justify-center gap-8 p-0 mt-4">
              <i className="fa-solid fa-qrcode font-bold text-6xl"></i>
              <h2 className="text-[1rem] font-bold text-gray-600 tracking-wider leading-snug">
                We deliver trust and authentic products.
                <span className="text-green"> in our BentoHub</span>
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
