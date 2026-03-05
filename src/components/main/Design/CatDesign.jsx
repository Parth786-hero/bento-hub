import { motion } from "framer-motion";

export default function CatDesign({ data , selected , onSelect }) {
  const { name, image_url } = data;
 
  return (
    <motion.div
    onClick={onSelect}
      className={`${selected ? "border-gray-400 border-1 " : ""} flex-col mb-2 p-1 rounded-xl cursor-pointer h-[6.5rem] w-[85%] ${selected ? "opacity-100" : "opacity-70"}`}
      whileHover={{
        scale: 1.03,
        boxShadow: selected ? "0px 8px 20px rgba(0,0,0,0.15)" :""
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-[90%] h-[65%] mx-auto p-1 rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={`/${image_url}`}
          alt={name}
          className="w-full h-full object-contain object-center rounded-2xl"
        />
      </div>
      <h2 className={`${selected ? "font-extrabold tracking-wider" : ""} h-[35%] text-center text-[10.5px] tracking-wide rounded p-1 flex items-center justify-center`}>
        {name}
      </h2>
    </motion.div>
  );
}

