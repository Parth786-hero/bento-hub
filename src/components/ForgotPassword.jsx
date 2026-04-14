import { motion , AnimatePresence} from "framer-motion";
import { useState , useRef , useEffect} from "react";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import { changeModalStatus } from "../store/slices/modalSlice";
import PasswordValidator from "./PasswordValidator";
import { API_URL } from "../main";
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const [on, setOn] = useState(true);
  const [number, setNumber] = useState("");
  const [userDetails , setUserDetails] = useState({});
  const [bag , setBag] = useState({password : "" , confirmPassword : ""})
  const [loader , setLoader] = useState(false);
  const [loader2 , setLoader2] = useState(false);
  const numberRef = useRef(null);
  const passwordRef = useRef(null);
  const inputRef = useRef(null);
  async function handlePhoneNumber(e) {
    e.preventDefault();
   try{
    setLoader(true);
    if(number){
      const res = await fetch(`${API_URL}/api/retrieveUser?number=${number}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      const data = await res.json();
      if(!res.ok){
       
        throw new Error(data.message);
      }
      setUserDetails(data.user);
      toast.success("Number Verified Successfully...");

      numberRef.current.classList.remove("removeShield");
      passwordRef.current.classList.add("removeShield");
    }else{
      toast.error("Please Enter Number please.")
    }
   }catch(e){
      toast.error(e.message);
   }finally{
    setLoader(false);
   }
    
  }


  async function handlePassword(e) {
    e.preventDefault();
    if (!bag.password || !bag.confirmPassword) {
      toast.error("Fill both fields.");
    } else if (bag.password !== bag.confirmPassword) {
      toast.error("Password did not match");
    } else {
     
      try {
        setLoader2(true);
        const res = await fetch(`${API_URL}/api/changeUserPassword`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: userDetails.id,
            password: bag.password,
          }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message);
        }
        toast.success("Password updated successfully");
        dispatch(changeModalStatus({mode : "LOG_IN" , show : true}))
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoader2(false); // match the loader state you set earlier
      }
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
    <>
      <div className="my-3 flex items-start justify-between gap-x-4 h-auto">
        <section
          className="rounded-md overflow-hidden relative w-1/2 flex items-center justify-center"
          style={{ height: "stretch" }}
        >
          <form
            action=""
            className="w-[90%] mt-[-1rem]"
            onSubmit={handlePhoneNumber}
          >
            <div className="mb-4">
              <label
                htmlFor="number"
                className="block text-gray font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter your phone number"
              />
            </div>
            <motion.button
              type="submit"
              className="tracking-wider w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
            >
              {
                loader ? "verifying..." : "Verify Phone Number"
              }
            </motion.button>
          </form>
          <div className="phone-cover absolute inset-0 bg-black opacity-95 removeShield  flex items-center justify-center" ref={numberRef}>
            {" "}
            <p className="text-green text-xl tracking-wider font-semibold text-center">
              Number verified successfully, you can now reset your password.
            </p>
          </div>
        </section>

        <section className="rounded-md overflow-hn pt-3 relative w-1/2 flex items-center justify-center h-[15rem]">
          <form
            action=""
            className="w-[90%] mt-[-1rem]"
            onSubmit={handlePassword}
          >
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                name="password"
                value={bag.password}
                onChange={(e)=>setBag({...bag , [e.target.name] : e.target.value})}
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
                  className="absolute right-[-17rem] top-[2rem]"
                >
                  <PasswordValidator
                    password={bag.password}
                    setOn={setOn}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            </div>
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="block text-gray font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="cpassword"
                disabled={on}
                name="confirmPassword"
                value={bag.confirmPassword}
                onChange={(e)=>setBag({...bag , [e.target.name] : e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter Confirm Password"
              />
            </div>
            <motion.button
              type="submit"
              className="tracking-wider w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
            >
              {
                loader2 ? "Resetting new Password..." : "Reset Password"
              }
            </motion.button>
          </form>
          <div className="password-cover absolute inset-0 bg-black opacity-[85%] flex items-center justify-center" ref={passwordRef}>
            <p className="text-white text-xl tracking-wider">
              Verify Number first...
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
