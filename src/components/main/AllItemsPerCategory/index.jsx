import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductCard from "../Products/ProductCard";
import Loader from "../../../utilis/Loader";

import { fetchAllProducts } from "../../../store/slices/productSlice";
export default function AllItemsPerCategory() {
  const location = useLocation();
  const dispatch = useDispatch();
  const bag = decodeURIComponent(location.pathname).split("/");
const {products , loading , error} = useSelector(bag=>bag.products);
const targetProducts = products.find(ele=>ele["category_name"] === bag[bag.length-1]);
console.log(targetProducts);
useEffect(()=>{
    dispatch(fetchAllProducts());
} , [dispatch]);

  return (
    <>
      <>
        <div className="mt-30 h-[75vh] shadow-xl rounded-md bg-gray-100 border-1  border-gray-300 overflow-y-auto">
          <h2
            className="sticky top-0 z-[10] border-b border-gray-300 font-extrabold tracking-wider h-[10%] flex items-center px-5"
            style={{ backgroundColor: "white" }}
          >
            {bag[bag.length - 1]}
          </h2>
          <div className="h-full relative grid grid-cols-6 p-4 gap-y-4 pb-150 place-items-center gap-7">
  {loading && (
    <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader />
    </div>
  )}
   {error && (
    <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-[2rem] tracking-wider">
      Error : {error}
    </div>
   
  )}


  {!error && !loading && targetProducts.products &&
    targetProducts.products.map((obj, id) => {
      return <ProductCard key={id} data={obj} />;
    })}
</div>

        </div>
      </>
    </>
  );
}
