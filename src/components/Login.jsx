import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [bag, setBag] = useState({ number: "", password: "" });
  const dispatch = useDispatch();
  const { loading } = useSelector((bag) => bag.login);

  function trigger(e) {
    const { id, value } = e.target;
    setBag({ ...bag, [id]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in bag) {
      if (!bag[key]) {
        toast.error("Kindly fill both the fields first");
        return;
      }
    }
    try {
      await dispatch(loginUser(bag)).unwrap();
    
      toast.success("Hey, Log in Successfull...");
      dispatch(changeModalStatus({ show: false }));
      navigate("/");
    } catch (e) {
      toast.error(typeof e === "string" ? e : e.message || "Login failed");
    }
  }
  return (
    <div className="flex items-center justify-between h-auto relative">
      <div className="absolute w-[12rem] h-[12rem] rounded-full overflow-hidden right-[0rem]">
        <img src="./kiwi.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-100 opacity-[3%]"></div>
      </div>
      <form
        className="rounded-lg p-4 w-[65%] relative mb-4"
        onSubmit={handleSubmit}
      >
        <div className="absolute bottom-[-.8rem] w-[88%] text-[14px] flex items-center justify-between left-[50%] transform -translate-x-[50%]">
          <motion.p
            className="cursor-pointer tracking-wide font-semibold"
            whileHover={{ scale: 0.95, transition: { duration: 0.1 } }}
            onClick={() =>
              dispatch(
                changeModalStatus({ show: true, mode: "FORGOT_PASSWORD" })
              )
            }
          >
            Forgot Password?
          </motion.p>
          <motion.p
            className="cursor-pointer tracking-wide font-semibold text-green "
            whileHover={{ scale: 0.95, transition: { duration: 0.1 } }}
            onClick={() =>
              dispatch(changeModalStatus({ show: true, mode: "REGISTER" }))
            }
          >
            New Member?
          </motion.p>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray font-medium mb-2">
            Phone Number
          </label>
          <input
            type="number"
            id="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            placeholder="Enter your phone number"
            value={bag.number}
            onChange={trigger}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            placeholder="Enter your password"
            value={bag.password}
            onChange={trigger}
          />
        </div>

        {loading ? (
          <motion.button
            type="submit"
            disabled
            className="w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
          >
            Processing...
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            className="w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
          >
            Log in
          </motion.button>
        )}
      </form>
    </div>
  );
}
