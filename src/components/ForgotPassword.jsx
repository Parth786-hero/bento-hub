import { motion } from "framer-motion";
export default function ForgotPassword() {
    
  function handlePhoneNumber(e) {
    e.preventDefault();
    const objPass = document.querySelector(".password-cover");
    const objNumber = document.querySelector(".phone-cover");
    objNumber.classList.remove("removeShield");
    objPass.classList.add("removeShield");
  }
  function handlePassword(e) {
    e.preventDefault();
  }
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter your phone number"
              />
            </div>
            <motion.button
              type="submit"
              className="tracking-wider w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
            >
              Verify Phone Number
            </motion.button>
          </form>
          <div className="phone-cover absolute inset-0 bg-black opacity-[50%] removeShield"></div>
        </section>

        <section className="rounded-md overflow-hidden pt-3 relative w-1/2 flex items-center justify-center h-[15rem]">
          <form
            action=""
            className="w-[90%] mt-[-1rem]"
            onSubmit={handlePassword}
          >
            <div className="mb-4">
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
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="block text-gray font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
                placeholder="Enter Confirm Password"
              />
            </div>
            <motion.button
              type="submit"
              className="tracking-wider w-full bg-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green transition duration-300 cursor-pointer"
            >
              Reset Password
            </motion.button>
          </form>
          <div className="password-cover absolute inset-0 bg-black opacity-[85%] flex items-center justify-center">
            <p className="text-white text-xl tracking-wider">Verify Number first...</p>
          </div>
        </section>
      </div>
    </>
  );
}
