import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";
// import { logout } from "../store/slices/loginSlice";
import UserAccount from "./main/UserAccount";
import { useNavigate } from "react-router-dom";
import CartButton from "./main/CartButton";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((bag) => bag.login);

  return (
    <>
      <div className="fixed w-full top-0 left-0 z-50 bg-gray-100">
        <nav
          className={`w-[95%] mx-auto flex items-center justify-between py-5`}
        >
          <h2
            className="font-black tracking-wide text-2xl flex items-center justify-between cursor-pointer"
            id="logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
          >
            <span>
              <i className="fa-solid fa-blog"></i>
            </span>
            Bento <span className="text-green">Hub</span>
          </h2>
          {isAuthenticated && (
            <div className="cursor-pointer">
              <h2 className="text-xl font-black tracking-wide mb-[.2rem]">
                Delivery in 10 mins
              </h2>
              <div className="flex items-center gap-1">
                <p className="text-[16px] font-medium capitalize">
                  {user && user.street.length > 17
                    ? user.street.slice(0, 18) + "...."
                    : user.street}
                </p>
                <i className="fa-solid fa-angle-down"></i>
              </div>
            </div>
          )}
          <p
            className={`border rounded-md px-4 py-[.5rem] border-green text-gray-500 cursor-pointer`}
            style={{ width: isAuthenticated ? "45%" : "60%" }}
            onClick={() => {
              isAuthenticated
                ? navigate("/s")
                : dispatch(changeModalStatus({ show: true, mode: "LOG_IN" }));
            }}
          >
            Search items here...
          </p>
          {isAuthenticated ? (
            <section className="flex items-center gap-x-8">
              <UserAccount />

              <CartButton />
            </section>
          ) : (
            <section className="flex items-center gap-x-8">
              <motion.button
                className="font-bold tracking-wide cursor-pointer"
                onClick={() =>
                  dispatch(changeModalStatus({ show: true, mode: "REGISTER" }))
                }
                whileHover={{
                  x: [0, -3, 3, -3, 3, 0], // small horizontal jitter
                  transition: { duration: 0.4 },
                }}
                whileTap={{
                  scale: 0.95,
                  x: [0, -5, 5, -5, 5, 0], // stronger jitter on click
                  transition: { duration: 0.3 },
                }}
              >
                Sign up
              </motion.button>
              <motion.button
                className="btn px-6 py-2 rounded-md font-semibold tracking-wide shadow-md"
                onClick={() =>
                  dispatch(changeModalStatus({ show: true, mode: "LOG_IN" }))
                }
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
                Log in
              </motion.button>
            </section>
          )}
        </nav>
      </div>
    </>
  );
}
