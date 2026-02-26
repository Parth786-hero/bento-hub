import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";

export default function Modal({ heading, children, isOpen }) {
  const dispatch = useDispatch();
  const show = useSelector((bag) => bag.modal).show;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-gray-900/90 flex items-center justify-center z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-[50%] h-auto p-4"
            initial={{ y: "100%" }} // start off-screen to the right
            animate={{ y: 0 }} // slide into place
            exit={{ y: "100%" }} // slide back out
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <section className="flex items-center justify-between pb-2">
              <h1 className="font-semibold text-2xl text-green">{heading}</h1>
              <motion.p
                className="cursor-pointer font-bold p-2"
                onClick={() => dispatch(changeModalStatus(false))}
                whileHover={{ scale: 1.2, rotate: 90, color: "gray" }}
                whileTap={{ scale: 0.9, rotate: -90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <i className="fa-solid fa-x"></i>
              </motion.p>
            </section>

            <hr />
            <p className="text-[11px] text-gray text-center mt-2 tracking-wider">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A placeat
              soluta, id dicta eveniet voluptatum asperiores deleniti illum
              ipsum eos. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Repudiandae, praesentium.
            </p>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
