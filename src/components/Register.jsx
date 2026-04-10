import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";
import { toast } from "react-toastify";
import { updateFormData } from "../store/slices/formSlice";
import PasswordValidator from "./PasswordValidator";
export default function Register() {
  const dispatch = useDispatch();
  const formData = useSelector((bag) => bag.form.form);
  const [focused, setFocused] = useState(false);
  const [on, setOn] = useState(true);
  // const [position, setPosition] = useState({ top: "-1rem", left: "10rem" });
  const inputRef = useRef(null);
  function checkAllFields(bag) {
    for (let key in bag) {
      if (
        key === "city" ||
        key === "state" ||
        key === "street" ||
        key === "zipcode"
      )
        continue;
      if (!bag[key]) return false;
    }
    return true;
  }

  // handle input changes
  function handleChange(e) {
    const { id, value } = e.target;

    dispatch(updateFormData({ [id]: value }));
  }

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (checkAllFields(formData)) {
      dispatch(changeModalStatus({ mode: "ADDRESS", show: true }));
    } else {
      toast.error("All Fields are mandatory");
    }
  }
  useEffect(() => {
    if (focused && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY, // account for scroll
        left: rect.right + 10 + window.scrollX, // place to the right with some gap
      });
    }
  }, [focused]);
  return (
    <div className="flex items-center justify-between h-auto relative">
      <form
        className="rounded-lg p-2 w-full relative mb-2"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your First Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your Last Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-gray font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your password"
            />
            <AnimatePresence>
              {focused && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-[-85%]"
                >
                  <PasswordValidator
                    password={formData.password}
                    setOn={setOn}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mb-6">
            <label
              htmlFor="cpassword"
              className="block text-gray font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              disabled={on}
              value={formData.cpassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Enter your confirm password"
            />
          </div>
          {/* Add state, city, street, zipcode inputs here if needed */}
        </div>
        <motion.button
          type="submit"
          className="w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
        >
          Proceed 1/2
        </motion.button>
      </form>
    </div>
  );
}
