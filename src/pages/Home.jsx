import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import { useSelector, useDispatch } from "react-redux";
import { changeModalStatus } from "../store/slices/modalSlice";
import ModalComponent from "../components/ModalCompo";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
export default function Home() {
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const modalStatus = useSelector((bag) => bag.modal).show;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (modalStatus) {
      document.body.classList.add("body-overflow");
    } else {
      document.body.classList.remove("body-overflow");
    }
  }, [modalStatus]);
  return (
    <>
      <div className="overflow-hidden relative bg-thunk">
        {modalStatus && <ModalComponent />}
        {scrolled && (
          <div
            className="z-11 fixed bottom-6 left-1/2 -translate-x-1/2 w-[2.5rem] h-[2.5rem] rounded-full bg-green text-white flex items-center justify-center cursor-pointer shadow-lg transition-opacity duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fa-solid fa-arrow-up animate-bounce"></i>
          </div>
        )}
        <div className="max-w-[95%] mx-auto relative " id="father">
          <Navbar />
          <div className="my-5 flex px-0 items-center gap-x-4 mt-25">
            <button
              className="btn-temp"
              onClick={() =>
                document
                  .getElementById("fruits")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Fruits
            </button>
            <button
              className="btn-temp"
              onClick={() =>
                document
                  .getElementById("vegetables")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Vegetables
            </button>

            <button
              className="btn-temp"
              onClick={() =>
                document
                  .getElementById("drinks")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Drinks
            </button>
            <button
              className="btn-temp"
              onClick={() =>
                document
                  .getElementById("links")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              More Links...
            </button>
          </div>
          <div className="frame border h-[70vh] rounded-xl mt-2 overflow-hidden p-6 py-6 flex justify-between items-center">
            <div className="text-white w-[70%] p-4">
              <h1 className="text-[2.8rem] leading-[3.5rem] tracking-wide font-normal">
                <span className="font-bold text-[4rem] text-green">W</span>here
                chaos meets code, we deliver clarity.{" "}
                <span className="font-bold text-green">
                  Where problems knock
                </span>
                , our solutions rock. Where ideas spark, we build them to last.
              </h1>
              <p className="my-2 text-[14px] leading-[1.5rem] w-[80%] tracking-wider">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis repellendus sapiente iusto similique. Placeat aliquid
                nesciunt sit earum sint impedit!Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Labore
              </p>
              <div className="flex gap-x-8 mt-4">
                <motion.button
                  className="btn-secondary capitalize tracking-wide"
                  onClick={() =>
                    document
                      .getElementById("links")
                      .scrollIntoView({ behavior: "smooth" })
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
                  explore
                </motion.button>
                <motion.button
                  className="btn-secondary capitalize tracking-wide"
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
                  login
                </motion.button>
              </div>
            </div>
          </div>
          <Section />
          <Footer />
        </div>
      </div>
    </>
  );
}
