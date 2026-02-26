import { motion } from "framer-motion";
export default function Special() {
  return (
    <>
      <div className="mt-[7.3rem] h-[20rem] rounded-2xl relative overflow-hidden div-bg px-8 py-6">
        <h1 className="relative z-10 text-white text-5xl w-[65%] tracking-wide leading-snug font-extrabold">
         Stock Up daily <span className="text-green">Essentials</span>.
        </h1>
        <p className="text-3xl text-white w-[60%] mt-3 leading-snug tracking-wide">Get Farm Fresh <span className="text-green">goodness</span> and a <span className="text-green">range of exotic</span> fruits. vegetables , eggs and more.<span className="text-green">Explore</span> more on our store.All aunthentic brands here.</p>
        <motion.button
          className="btn-white px-6 py-2 rounded-md font-black tracking-wide shadow-md mt-7"
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
         Shop Now
        </motion.button>
      </div>
    </>
  );
}
