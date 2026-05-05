// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import ProductCard from "../Products/ProductCard";
// import Loader from "../../../utilis/Loader";

// import { fetchAllProducts } from "../../../store/slices/productSlice";
// export default function AllItemsPerCategory() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const bag = decodeURIComponent(location.pathname).split("/");
//   const { products, loading, error } = useSelector((bag) => bag.products);
//   const targetProducts = products.find(
//     (ele) => ele["category_name"] === bag[bag.length - 1]
//   );
 
//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   return (
//     <>
//       <>
//         <div className="mt-42 md:mt-30 h-[50vh] md:h-[75vh] shadow-xl rounded-md border border-gray-300">
//           <h2
//             className="sticky top-0 z-[10] border-b border-gray-300 font-extrabold tracking-wider h-[10%] flex items-center px-3 md:px-5"
//             style={{ backgroundColor: "white" }}
//           >
//             {bag[bag.length - 1]}
//           </h2>
//           <div className="overflow-y-auto overflow-x-hidden relative grid grid-cols-3 md:grid-cols-6 md:p-4 gap-y-1 md:gap-y-4 md:pb:150 place-items-center py-3 md:gap-7 h-[90%] md-h-full">
//             {loading && (
//               <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <Loader />
//               </div>
//             )}
//             {error && (
//               <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-[2rem] tracking-wider">
//                 Error : {error}
//               </div>
//             )}

//             {!error &&
//               !loading &&
//               targetProducts?.products &&
//               targetProducts?.products.map((obj, id) => {
//                 return <ProductCard key={id} data={obj} />;
//               })}
//           </div>
//         </div>
//       </>
//     </>
//   );
// }

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
    <div className="hide-scrollbar mt-42 md:mt-30 border border-gray-300 rounded-md shadow-xl flex flex-col"
    style={{ height: "calc(100vh - 10rem)" }}> 
 {/* Heading stays pinned */}
 <h2 className="sticky top-0 z-10 border-b border-gray-300 font-extrabold tracking-wider px-3 py-2 bg-white">
   {bag[bag.length - 1]}
 </h2>

 {/* Only this section scrolls */}
 <div className="hide-scrollbar overflow-y-auto overflow-x-hidden grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-5 px-3 pb-3 relative mt-4">
   {loading && (
     <div className="absolute inset-0 flex items-center justify-center">
       <Loader />
     </div>
   )}
   {/* <Loader /> */}
   {error && (
     <div className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-2xl tracking-wider">
       Error : {error}
     </div>
   )}
   {!error &&
     !loading &&
     targetProducts?.products &&
     targetProducts?.products.map((obj, id) => (
       <ProductCard key={id} data={obj} />
     ))}
 </div>
</div>

  
  );
}

