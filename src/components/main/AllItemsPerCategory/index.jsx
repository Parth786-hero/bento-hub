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
  const { products, loading, error } = useSelector((bag) => bag.products);
  const targetProducts = products.find(
    (ele) => ele["category_name"] === bag[bag.length - 1]
  );
 
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <>
        <div className="mt-42 md:mt-30 h-[50vh] md:h-[75vh] shadow-xl rounded-md bg-gray-100 border border-gray-300">
          <h2
            className="sticky top-0 z-[10] border-b border-gray-300 font-extrabold tracking-wider h-[10%] flex items-center px-3 md:px-5"
            style={{ backgroundColor: "white" }}
          >
            {bag[bag.length - 1]}
          </h2>
          <div className="overflow-y-auto overflow-x-hidden relative grid grid-cols-3 md:grid-cols-6 md:p-4 gap-y-1 md:gap-y-4 md:pb:150 place-items-center py-3 md:gap-7 h-[90%] md-h-full">
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

            {!error &&
              !loading &&
              targetProducts?.products &&
              targetProducts?.products.map((obj, id) => {
                return <ProductCard key={id} data={obj} />;
              })}
          </div>
        </div>
      </>
    </>
  );
}
