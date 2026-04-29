import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function CategoryCard({ data }) {
  const { name, image_url , id} = data;
  const navigate = useNavigate();
  return (
    <motion.div
    onClick={()=>{
      navigate(`/${name}/${id}/${name}`);
    }}
      className="flex-col w-[5.2rem] md:w-[7rem] md:h-[10rem] cursor-pointer px-0"
      whileHover={{ scale: 1.05 }}   // single subtle hover effect
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-[70%] flex items-center justify-center">
        <div className="w-[6.5rem] h-[100%] overflow-hidden rounded-2xl p-3">
          <img
            // src={`./${image_url}`}
            src={`${import.meta.env.BASE_URL}${image_url}`}
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>

      <div className="w-full h-[30%] flex items-start justify-center">
        <h2 className="text-black w-[80%] text-center font-semibold leading-snug tracking-wide text-[10px] md:text-[14px]">
          {name}
        </h2>
      </div>
    </motion.div>
  );
}
