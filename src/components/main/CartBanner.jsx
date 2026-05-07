import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { API_URL } from "../../main";
import { fetchAllProducts } from "../../store/slices/productSlice";
function CartBanner({ show, getBag }) {
  const items = getBag().length > 3 ? getBag().slice(-3) : getBag();
  const dispatch = useDispatch();
  const { products } = useSelector((bag) => bag.products);
  const allProducts = products.flatMap((cat) => cat.products);
    
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 180,
              damping: 15,
            },
          }}
          exit={{
            y: 120,
            opacity: 0,
            scale: 0.7,
            rotate: -5,
            filter: "blur(4px)",
            transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
          }}
          layout
          className="flex items-center gap-3 px-2.5 py-2 fixed w-fit bg-green bottom-2 z-50 
                     left-1/2 transform -translate-x-1/2 rounded-full text-white shadow-xl"
        >
          <div className="p-0.5 flex items-center">
            {items.map((ele, idx) => {
              const obj = allProducts.find((o) => o.id == ele.id);

              return (
                <motion.aside
                  key={obj?.id || idx}
                  initial={{ y: -50, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{
                    scale: [1, 1.3, 0.6], // puff up then shrink
                    opacity: [1, 0.8, 0], // fade out
                    borderRadius: ["25%", "50%"], // morph into bubble
                    y: -40, // float upward
                    filter: ["blur(0px)", "blur(6px)"],
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: idx * 0.1, // staggered drop-in
                  }}
                  whileHover={{ scale: 1.2, rotate: 5, zIndex: 50 }}
                  className={`bg-white rounded-full p-0.5 w-9 h-9 overflow-hidden shadow-md 
                    -ml-3 first:ml-0 relative`}
                  style={{ zIndex: idx + 1 }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${obj?.image_url}`}

                    alt={obj?.name}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.aside>
              );
            })}
          </div>

          <div className="flex items-center gap-2 justify-center">
            <section className="flex flex-col flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
                className="text-lg font-bold tracking-wide whitespace-nowrap"
              >
                View Cart
              </motion.span>
              <span className="font-bold text-sm tracking-wider">
                {getBag().reduce((a, b) => a + b.count, 0)} items
              </span>
            </section>
            <motion.span
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="border-gray-50 rounded-full mr-1 shadow-xl p-0.5 cursor-pointer transition-all"
            >
              <ChevronRight />
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartBanner;
